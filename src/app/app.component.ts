import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CategoriaRecepta, NovaRecepta, Recepta } from './models/recepta.model';
import { ReceptesService } from './services/receptes.service';
import { LlistaReceptesComponent } from './components/llista-receptes/llista-receptes.component';
import {
  BarraFiltresComponent,
  FiltresReceptes,
} from './components/barra-filtres/barra-filtres.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, FormsModule, LlistaReceptesComponent, BarraFiltresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  readonly receptesService = inject(ReceptesService);
  readonly estat$ = this.receptesService.estat$;

  readonly categories: CategoriaRecepta[] = [
    'Primers plats',
    'Segons plats',
    'Postres',
    'Aperitius',
    'Begudes',
  ];

  receptaSeleccionada: Recepta | null = null;
  mostrarFormulariAlta = false;
  missatgeAlta = '';
  errorAlta = '';
  desant = false;

  novaRecepta: NovaRecepta = {
    titol: '',
    descripcio: '',
    categoria: 'Primers plats',
    valoracio: 4.5,
    destacada: false,
  };

  aplicarFiltres(filtres: FiltresReceptes): void {
    this.receptaSeleccionada = null;
    this.receptesService.cercar({
      terme: filtres.cerca,
      categoria: filtres.categoria,
    });
  }

  seleccionarRecepta(recepta: Recepta): void {
    this.receptaSeleccionada = this.receptaSeleccionada?.id === recepta.id ? null : recepta;
  }

  reintentarCarrega(): void {
    this.receptesService.reintentarUltimaConsulta();
  }

  enviarNovaRecepta(): void {
    if (!this.novaRecepta.titol.trim() || !this.novaRecepta.descripcio.trim()) {
      return;
    }

    this.missatgeAlta = '';
    this.errorAlta = '';
    this.desant = true;

    this.receptesService.crearRecepta(this.novaRecepta).subscribe({
      next: (creada) => {
        this.desant = false;
        this.missatgeAlta = `Recepta "${creada.titol}" desada correctament a l'API!`;
        this.novaRecepta = {
          titol: '',
          descripcio: '',
          categoria: 'Primers plats',
          valoracio: 4.5,
          destacada: false,
        };
        this.mostrarFormulariAlta = false;
      },
      error: (err: Error) => {
        this.desant = false;
        this.errorAlta = err.message;
      },
    });
  }
}
