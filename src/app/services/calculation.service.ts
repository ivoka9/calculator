import { Injectable } from '@angular/core';
import { Symbol } from '../components/screen/screen.component';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  firstDigit: string = '';
  secondDigit: string = '';
  symbol: Symbol | '' = '';

  constructor() {}
  checkAll() {
    console.log(this.firstDigit);
    console.log(this.secondDigit);
    console.log(this.symbol);
  }

  addDigit(digit: string) {
    if (!this.firstDigit) {
      this.firstDigit = digit;
    } else if (!this.secondDigit) {
      this.secondDigit = digit;
    }
  }

  addSymbol(symbol: Symbol, calc: boolean) {
    if (calc) {
      this.firstDigit = this.calculate().toString();
    }
    this.symbol = symbol;
  }

  resetAll() {
    this.symbol = '';
    this.firstDigit = '';
    this.secondDigit = '';
  }

  calculate(): number {
    const num1 = Number(this.firstDigit);
    const num2 = Number(this.secondDigit);
    const tempSymbol = this.symbol;
    let res = 0;
    console.log(num1, num2, this.symbol);

    if (this.symbol === '+') {
      res = num1 + num2;
    }
    if (this.symbol === '-') {
      res = num1 - num2;
    }
    if (this.symbol === 'X') {
      res = num1 * num2;
    }
    if (this.symbol === '/') {
      res = num1 / num2;
    }
    this.resetAll();

    return res;
  }
}
