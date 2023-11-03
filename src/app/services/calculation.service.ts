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
  error = '';
  observer: BehaviorSubject<any> = new BehaviorSubject({
    firstDigit: this.firstDigit,
    secondDigit: this.secondDigit,
    symbol: this.symbol,
    answer: this.answer,
    error: this.error,
  });

  constructor(private http: HttpClient) {}

  async addSymbol(
    symbol: Symbol,
    value: string,
    calc: boolean
  ): Promise<string | void> {
    if (!this.firstDigit) {
      this.firstDigit = value;
    } else if (calc) {
      this.secondDigit = value;
      try {
        this.firstDigit = await this.calculate();
      } catch (err: any) {
        this.resetAll(true);
        return err;
      }
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
      try {
        this.answer = await this.calculate();
      } catch (err: any) {
        this.resetAll(true);
        return err;
      }
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
    if (Number(this.secondDigit) === 0 && this.symbol === '/') {
      return Promise.reject('Cannot divide by zero');
    }
    return lastValueFrom(
      this.http.post('http://localhost:8000', {
        num1: Number(this.firstDigit),
        num2: Number(this.secondDigit),
        symbol: this.symbol,
      })
    ) as Promise<string>;
  }
}
