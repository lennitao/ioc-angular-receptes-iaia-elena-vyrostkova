import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaRecepta } from '../../models/recepta.model';

export interface FiltresReceptes {
  cerca: string;
  categoria: CategoriaRecepta | '';
}

@Component({
  selector: 'app-barra-filtres',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './barra-filtres.component.html',
  styleUrl: './barra-filtres.component.scss',
})
export class BarraFiltresComponent {
  categories: CategoriaRecepta[] = [
    'Primers plats',
    'Segons plats',
    'Postres',
    'Aperitius',
    'Begudes',
  ];

  cerca = '';
  categoria: CategoriaRecepta | '' = '';

  @Output() filtresCanviats = new EventEmitter<FiltresReceptes>();

  actualitzarFiltres(): void {
    this.filtresCanviats.emit({
      cerca: this.cerca.trim(),
      categoria: this.categoria,
    });
  }
}
