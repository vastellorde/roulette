import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit, Renderer2,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HistoryService} from '../helpers/history.service';
import {MoneyService} from '../helpers/money.service';
import {MatDialog} from '@angular/material/dialog';
import {NotEnoughMoneyComponent} from '../../shared/not-enough-money/not-enough-money.component';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  @ViewChild('inner') inner: ElementRef;
  @ViewChild('data') data: ElementRef;
  numbers: number[] = Array.apply(null, {length: 36}).map(Number.call, Number);
  formGroup: FormGroup;
  result = {
    color: null,
    number: null
  };
  notEnough = false;

  lose = false;
  spin: HTMLButtonElement;
  reset: HTMLButtonElement;
  mask: HTMLDivElement;
  maskDefault = 'Ваша ставка';
  timer = 9000;
  red = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
  random = 0;

  constructor(@Inject(DOCUMENT) private document: Document,
              private fb: FormBuilder,
              private historyService: HistoryService,
              private moneyService: MoneyService,
              private dialog: MatDialog,
              private cd: ChangeDetectorRef,
              private renderer: Renderer2) {
    this.formGroup = fb.group({
      multiplicity: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.moneyService.noEnoughMoney$.subscribe(data => this.notEnough = data);
    this.spin = this.document.querySelector('#spin');
    this.mask = this.document.querySelector('.mask');

    this.mask.innerText = this.maskDefault;
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

    this.random = Math.floor(Math.random() * 36);

    this.cd.detectChanges();

    setTimeout(() => {
      this.mask.innerText = this.maskDefault;
    }, this.timer + 500);

    setTimeout(() => {
      if (this.red.findIndex(c => c === this.random) !== -1) {
        this.result.color = 'red';
      } else {
        this.result.color = 'black';
      }

      if (this.random === 0) {
        this.result.color = 'green';
      }

      (this.document.querySelector('.result-number') as HTMLDivElement).innerText = this.random.toString();
      (this.document.querySelector('.result-color') as HTMLDivElement).innerText = this.result.color;
      (this.document.querySelector('.result') as HTMLDivElement).style.backgroundColor = this.result.color;
      this.renderer.addClass(this.data.nativeElement, 'reveal');
      this.renderer.addClass(this.inner.nativeElement, 'rest');

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
      this.cd.detectChanges();
    }, this.timer);
  }

  isMultiple(value: number): boolean {
    if (this.formGroup.controls.multiplicity.value === null) {
      return false;
    }
    if (value === 0) {
      return !this.isRightColor(value);
    }
    if (this.formGroup.controls.color.value === 'green') {
      return true;
    }
    if (+this.formGroup.controls.multiplicity.value === 0) {
      return value % 2 !== 0 && !this.isRightColor(value);
    } else {
      return value % 2 === 0 && !this.isRightColor(value);
    }
  }

  isRightColor(value: number): boolean {
    if (this.formGroup.controls.color.value === null) {
      return false;
    }

    if (this.formGroup.controls.color.value === 'green') {
      return value === 0;
    }

    if (this.formGroup.controls.color.value === 'red') {
      return this.red.findIndex(c => c === value) !== -1;
    } else if (this.formGroup.controls.color.value === 'black') {
      return this.red.findIndex(c => c === value) === -1;
    }
  }
}
