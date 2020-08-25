import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColorPipe} from './pipes/color.pipe';
import {MultiplicityPipe} from './pipes/multiplicity.pipe';
import { NotEnoughMoneyComponent } from './not-enough-money/not-enough-money.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

const pipes = [
  ColorPipe,
  MultiplicityPipe
];

@NgModule({
  declarations: [
    ...pipes,
    NotEnoughMoneyComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ...pipes
  ]
})
export class SharedModule { }
