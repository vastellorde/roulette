import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  numbers: number[] = Array.apply(null, {length: 10}).map(Number.call, Number);
  money = 1000;
  formGroup: FormGroup;
  result = {
    color: null,
    multiplicity: null,
    number: null
  };

  constructor(private fb: FormBuilder) {
    this.formGroup = fb.group({
      multiplicity: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.money < this.formGroup.controls.rate.value) {
      return;
    }
    this.money -= this.formGroup.controls.rate.value;
    this.result.color = Math.floor(Math.random() * 3);
    this.result.multiplicity = Math.floor(Math.random() * 2);
    this.result.number = Math.floor(Math.random() * 10);

    for (const key of Object.keys(this.formGroup.controls)) {
      console.log(this.formGroup.controls[key]);
      let isLosed = false;
      if (key in this.result) {
        if (this.result[key] !== this.formGroup.controls[key].value) {
          console.log('Проиграл');
          isLosed = true;
          break;
        }
      }
    }
  }
}
