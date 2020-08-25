import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HistoryComponent
      }
    ])
  ]
})
export class HistoryModule { }
