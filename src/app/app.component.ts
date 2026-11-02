import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Recepta } from './models/recepta.model';
import { RECEPTES_MOCK } from './mocks/receptes-mock';
import { LlistaReceptesComponent } from './components/llista-receptes/llista-receptes.component';
import {
  BarraFiltresComponent,
  FiltresReceptes,
} from './components/barra-filtres/barra-filtres.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LlistaReceptesComponent, BarraFiltresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  receptes: Recepta[] = RECEPTES_MOCK;
  receptesFiltrades: Recepta[] = RECEPTES_MOCK;

  filtres: FiltresReceptes = {
    cerca: '',
    categoria: '',
  };

  receptaSeleccionada: Recepta | null = null;

  aplicarFiltres(filtres: FiltresReceptes): void {
    this.filtres = filtres;

    this.receptesFiltrades = this.receptes.filter((recepta) => {
      const coincideixTitol = recepta.titol.toLowerCase().includes(filtres.cerca.toLowerCase());

      const coincideixCategoria = !filtres.categoria || recepta.categoria === filtres.categoria;

      return coincideixTitol && coincideixCategoria;
    });

    const idSeleccionada = this.receptaSeleccionada?.id;

    if (
      idSeleccionada !== undefined &&
      !this.receptesFiltrades.some((recepta) => recepta.id === idSeleccionada)
    ) {
      this.receptaSeleccionada = null;
    }
  }

  seleccionarRecepta(recepta: Recepta): void {
    this.receptaSeleccionada = recepta;
  }
}
