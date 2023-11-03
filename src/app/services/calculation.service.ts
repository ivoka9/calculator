import { Injectable } from '@angular/core';
import { Symbol } from '../components/screen/screen.component';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  async addSymbol(symbol: Symbol, value: string, calc: boolean) {
    if (!this.firstDigit) {
      this.firstDigit = value;
    } else if (calc) {
      this.secondDigit = value;
      this.firstDigit = await this.calculate();
    }
    this.symbol = symbol;
    this.answer = '';
    this.sendValues();
  }

  async findAnswer(value: string): Promise<string> {
    if (!this.symbol) {
      this.answer = value;
    } else {
      this.secondDigit = value;
      //@t
      this.answer = await this.calculate();
      console.log(this.answer);
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

  private calculate(): Promise<string> {
    return lastValueFrom(
      this.http.post('http://localhost:8000', {
        num1: Number(this.firstDigit),
        num2: Number(this.secondDigit),
        symbol: this.symbol,
      })
    ) as Promise<string>;
  }
}
