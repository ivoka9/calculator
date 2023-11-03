import { Injectable } from '@angular/core';
import { Symbol } from '../components/screen/screen.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  firstDigit: string = '';
  secondDigit: string = '';
  symbol: Symbol | '' = '';
  answer = '';
  observer: BehaviorSubject<any> = new BehaviorSubject({
    firstDigit: this.firstDigit,
    secondDigit: this.secondDigit,
    symbol: this.symbol,
    answer: this.answer,
  });

  constructor() {}

  addSymbol(symbol: Symbol, value: string, calc: boolean) {
    if (!this.firstDigit) {
      this.firstDigit = value;
    } else if (calc) {
      this.secondDigit = value;
      this.firstDigit = this.calculate().toString();
    }
    this.symbol = symbol;
    this.answer = '';
    this.sendValues();
  }

  findAnswer(value: string): string {
    if (!this.symbol) {
      this.answer = value;
    } else {
      this.secondDigit = value;
      this.answer = this.calculate().toString();
    }
    this.sendValues();
    this.resetAll();

    return this.answer;
  }

  resetAll(broadcast?: boolean) {
    this.symbol = '';
    this.firstDigit = '';
    this.secondDigit = '';
    if (broadcast) {
      this.answer = '';
      this.sendValues();
    }
  }

  private getValues() {
    return {
      firstDigit: this.firstDigit,
      secondDigit: this.secondDigit,
      symbol: this.symbol,
      answer: this.answer,
    };
  }

  private sendValues() {
    this.observer.next(this.getValues());
  }

  private calculate(): number {
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
