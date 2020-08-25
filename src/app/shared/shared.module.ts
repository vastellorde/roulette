import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColorPipe} from './pipes/color.pipe';
import {MultiplicityPipe} from './pipes/multiplicity.pipe';

const pipes = [
  ColorPipe,
  MultiplicityPipe
];

@NgModule({
  declarations: [
    ...pipes
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...pipes
  ]
})
export class SharedModule { }
