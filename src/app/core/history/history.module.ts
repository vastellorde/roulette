import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import {RouterModule} from '@angular/router';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HistoryComponent
      }
    ]),
    MatTableModule
  ]
})
export class HistoryModule { }
