import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrl: './select-button.component.css'
})
export class SelectButtonComponent {
  @Input() buttonLabel: string = 'test'
  @Input() buttonExplanation = 'Explication'

  @Output() dataToDisplayEmitter = new EventEmitter<void>();

  /**
   * Event emitter pour déclencher l'affichage des donnnées
   */
  dataToDisplay(): void {
    this.dataToDisplayEmitter.emit();
  }


}
