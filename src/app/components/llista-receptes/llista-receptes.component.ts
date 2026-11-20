import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recepta } from '../../models/recepta.model';
import { TargetaReceptaComponent } from '../targeta-recepta/targeta-recepta.component';

@Component({
  selector: 'app-llista-receptes',
  standalone: true,
  imports: [TargetaReceptaComponent],
  templateUrl: './llista-receptes.component.html',
  styleUrl: './llista-receptes.component.scss',
})
export class LlistaReceptesComponent {
  @Input({ required: true }) receptes: Recepta[] = [];

  @Output() seleccionada = new EventEmitter<Recepta>();
}
