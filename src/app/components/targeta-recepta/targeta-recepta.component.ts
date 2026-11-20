import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Recepta } from '../../models/recepta.model';
import { EtiquetaReceptaComponent } from '../etiqueta-recepta/etiqueta-recepta.component';

@Component({
  selector: 'app-targeta-recepta',
  standalone: true,
  imports: [DatePipe, EtiquetaReceptaComponent],
  templateUrl: './targeta-recepta.component.html',
  styleUrl: './targeta-recepta.component.scss',
})
export class TargetaReceptaComponent {
  @Input({ required: true }) recepta!: Recepta;

  @Output() seleccionada = new EventEmitter<Recepta>();

  seleccionarRecepta(): void {
    this.seleccionada.emit(this.recepta);
  }
}
