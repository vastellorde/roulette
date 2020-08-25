import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent
      }
    ]),
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ]
})
export class MainModule { }
