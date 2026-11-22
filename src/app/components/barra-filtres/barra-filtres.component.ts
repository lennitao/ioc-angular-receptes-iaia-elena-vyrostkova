import { Component, DestroyRef, OnInit, inject, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { CategoriaRecepta } from '../../models/recepta.model';
import { ReceptesService } from '../../services/receptes.service';
import { CercaGuardada, HistorialCerquesService } from '../../services/historial-cerques.service';
import {
  termeCercaValidValidator,
  termeExistentAsyncValidator,
} from '../../validadors/cerca.validadors';

export interface FiltresReceptes {
  cerca: string;
  categoria: CategoriaRecepta | '';
}

@Component({
  selector: 'app-barra-filtres',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './barra-filtres.component.html',
  styleUrl: './barra-filtres.component.scss',
})
export class BarraFiltresComponent implements OnInit {
  private readonly receptesService = inject(ReceptesService);
  private readonly historialService = inject(HistorialCerquesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly filtresCanviats = output<FiltresReceptes>();

  readonly categories: CategoriaRecepta[] = [
    'Primers plats',
    'Segons plats',
    'Postres',
    'Aperitius',
    'Begudes',
  ];

  historial: CercaGuardada[] = [];

  readonly formulariCerca = new FormGroup({
    cerca: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(3), termeCercaValidValidator()],
      asyncValidators: [termeExistentAsyncValidator(this.receptesService)],
    }),
    categoria: new FormControl<CategoriaRecepta | ''>('', {
      nonNullable: true,
    }),
  });

  get campCerca(): FormControl<string> {
    return this.formulariCerca.controls.cerca;
  }

  ngOnInit(): void {
    // 1. Recuperem l'historial i l'última cerca desats a localStorage
    this.historial = this.historialService.obtenirHistorial();
    const ultima = this.historialService.obtenirUltimaCerca();

    if (ultima && (ultima.cerca || ultima.categoria)) {
      this.formulariCerca.patchValue(
        {
          cerca: ultima.cerca,
          categoria: ultima.categoria,
        },
        { emitEvent: false },
      );
      this.emetreFiltres(ultima.cerca, ultima.categoria, false);
    }

    // 2. Subscripció reactiva a valueChanges amb debounceTime i distinctUntilChanged
    this.formulariCerca.valueChanges
      .pipe(
        debounceTime(350),
        distinctUntilChanged(
          (anterior, actual) =>
            anterior.cerca === actual.cerca && anterior.categoria === actual.categoria,
        ),
        filter(
          () =>
            !this.campCerca.hasError('minlength') &&
            !this.campCerca.hasError('caractersProhibits') &&
            !this.campCerca.hasError('nomesEspais'),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((valors) => {
        const cerca = valors.cerca ?? '';
        const categoria = (valors.categoria ?? '') as CategoriaRecepta | '';
        this.emetreFiltres(cerca, categoria, true);
      });
  }

  actualitzarFiltres(): void {
    if (
      this.campCerca.hasError('minlength') ||
      this.campCerca.hasError('caractersProhibits') ||
      this.campCerca.hasError('nomesEspais')
    ) {
      this.campCerca.markAsTouched();
      return;
    }

    const { cerca, categoria } = this.formulariCerca.getRawValue();
    this.emetreFiltres(cerca, categoria, true);
  }

  reutilitzarCerca(item: CercaGuardada): void {
    this.formulariCerca.patchValue(
      {
        cerca: item.cerca,
        categoria: item.categoria,
      },
      { emitEvent: false },
    );
    this.campCerca.updateValueAndValidity({ emitEvent: false });
    this.emetreFiltres(item.cerca, item.categoria, true);
  }

  restablirFiltres(): void {
    this.formulariCerca.reset({ cerca: '', categoria: '' }, { emitEvent: false });
    this.emetreFiltres('', '', true);
  }

  netejarHistorial(): void {
    this.historialService.esborrarHistorial();
    this.historial = [];
  }

  private emetreFiltres(
    cerca: string,
    categoria: CategoriaRecepta | '',
    desarHistorial: boolean,
  ): void {
    if (desarHistorial) {
      this.historial = this.historialService.desarCerca(cerca, categoria);
    }

    this.filtresCanviats.emit({
      cerca: cerca.trim(),
      categoria,
    });
  }
}
