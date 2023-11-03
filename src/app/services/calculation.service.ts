import { Injectable } from '@angular/core';
import { Symbol } from '../components/screen/screen.component';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  firstDigit: string = '';
  secondDigit: string = '';
  symbol: Symbol | '' = '';
  ans = '';

  constructor() {}
  checkAll() {
    console.log(this.firstDigit);
    console.log(this.secondDigit);
    console.log(this.symbol);
    console.log(this.ans);
  }

  addSymbol(symbol: Symbol, value: string, calc: boolean) {
    console.log(symbol, calc);
    if (!this.firstDigit) {
      this.firstDigit = value;
    } else if (calc) {
      this.secondDigit = value;
      this.firstDigit = this.calculate().toString();
    }
    this.symbol = symbol;
  }

  findAnswer(value: string): string {
    if (!this.symbol) {
      this.ans = value;
    } else {
      this.secondDigit = value;
      this.ans = this.calculate().toString();
    }
    this.resetAll();
    return this.ans;
  }

  resetAll() {
    this.symbol = '';
    this.firstDigit = '';
    this.secondDigit = '';
  }

  calculate(): number {
    const num1 = Number(this.firstDigit);
    const num2 = Number(this.secondDigit);
    let res = 0;

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
    return res;
  }
}
