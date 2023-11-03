import { Component } from '@angular/core';
import { CalculationService } from 'src/app/services/calculation.service';
export type Symbol = 'X' | '/' | '+' | '-';
@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss'],
})
export class ScreenComponent {
  currentValue: string = '0';
  error: string = '';
  calculationWasMade = false;
  digitLimit = 16;
  symbolWasPressed = false;
  buttons = [
    'CE',
    'C',
    '<<',
    '/',
    '7',
    '8',
    '9',
    'X',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '+/-',
    '0',
    '.',
    '=',
  ];
  firstValue = '';
  secondValue = '';
  symbol = '';
  ans = '';

  constructor(private calculationService: CalculationService) {}

  async handleClick(value: string) {
    if (this.error) {
      this.calculationService.resetAll();
    }
    this.checkLimit();
    if (value === 'C') {
      this.calculationService.resetAll(true);
      return this.resetCurrentValue();
    }
    if (value === 'CE') {
      return this.resetCurrentValue();
    }

    if (value === '+/-') {
      return (this.currentValue = (Number(this.currentValue) * -1).toString());
    }

    if (value === '.') {
      if (this.currentValue.indexOf('.') === -1) {
        this.currentValue += '.';
      }
      return;
    }

    if (value === '<<') {
      if (this.currentValue.length === 1 || this.error) {
        return this.resetCurrentValue();
      } else {
        return (this.currentValue = this.currentValue.slice(0, -1));
      }
    }
    if (['+', '-', 'X', '/'].includes(value)) {
      this.calculationService.addSymbol(
        value as Symbol,
        this.currentValue,
        !this.symbolWasPressed
      );
      this.symbolWasPressed = true;
      return;
    }
    if (value === '=') {
      this.currentValue = await this.calculationService.findAnswer(
        this.currentValue
      );
      return;
    }
    if (this.symbolWasPressed) {
      this.symbolWasPressed = false;
      this.currentValue = value;
      return;
    }

    if (this.currentValue.length === this.digitLimit) {
      return;
    }

    if (this.currentValue === '0') {
      return (this.currentValue = value);
    } else {
      return (this.currentValue += value);
    }
  }

  private checkLimit() {
    if (this.currentValue.indexOf('.') !== -1) {
      this.digitLimit = 17;
    } else {
      this.digitLimit = 16;
    }
  }

  private resetCurrentValue() {
    this.currentValue = '0';
  }
}
