import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input('label') label!: string;
  @Input('error') error: string = '';
  @Input('cssClass') cssClass: string = '';
  @Output('value') emitter = new EventEmitter<string>();

  handleClick() {
    this.emitter.emit(this.label);
  }
}
