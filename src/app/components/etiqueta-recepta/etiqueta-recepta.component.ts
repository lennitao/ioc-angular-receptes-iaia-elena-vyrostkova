import { Component, Input } from '@angular/core';
import { CategoriaRecepta } from '../../models/recepta.model';

@Component({
  selector: 'app-etiqueta-recepta',
  standalone: true,
  imports: [],
  templateUrl: './etiqueta-recepta.component.html',
  styleUrl: './etiqueta-recepta.component.scss',
})
export class EtiquetaReceptaComponent {
  @Input({ required: true }) categoria!: CategoriaRecepta;
  @Input() destacada = false;
}
