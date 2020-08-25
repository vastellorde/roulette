import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HistoryService} from '../helpers/history.service';
import {MoneyService} from '../helpers/money.service';
import {MatDialog} from '@angular/material/dialog';
import {NotEnoughMoneyComponent} from '../../shared/not-enough-money/not-enough-money.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  numbers: number[] = Array.apply(null, {length: 10}).map(Number.call, Number);
  formGroup: FormGroup;
  result = {
    color: null,
    multiplicity: null,
    number: null
  };
  notEnough = false;

  lose = false;

  constructor(private fb: FormBuilder,
              private historyService: HistoryService,
              private moneyService: MoneyService,
              private dialog: MatDialog) {
    this.formGroup = fb.group({
      multiplicity: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.moneyService.noEnoughMoney$.subscribe(data => this.notEnough = data);
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.moneyService.putMoney(+this.formGroup.controls.rate.value);
    if (this.notEnough) {
      this.dialog.open(NotEnoughMoneyComponent);
      return;
    }
    this.result.color = Math.floor(Math.random() * 3);
    this.result.multiplicity = Math.floor(Math.random() * 2);
    this.result.number = Math.floor(Math.random() * 10);

    for (const key of Object.keys(this.formGroup.controls)) {
      console.log(this.formGroup.controls[key]);
      if (key in this.result) {
        if (this.result[key] !== this.formGroup.controls[key].value) {
          console.log('Проиграл');
          this.lose = true;
          this.historyService.addGame(+this.formGroup.controls.rate.value, this.lose);
          break;
        }
      }
    }
  }

  isMultiple(value: number): boolean {
    if (this.formGroup.controls.multiplicity.value === null) {
      return;
    }
    if (+this.formGroup.controls.multiplicity.value === 0) {
      return value % 2 === 0;
    } else {
      return value % 2 !== 0;
    }
  }
}
