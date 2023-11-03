import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalculationService } from 'src/app/services/calculation.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent {
  displayValues$: BehaviorSubject<any>;
  constructor(private calculationService: CalculationService) {
    this.displayValues$ = this.calculationService.observer;
  }
}
