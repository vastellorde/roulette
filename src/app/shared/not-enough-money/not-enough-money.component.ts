import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MoneyService} from '../../core/helpers/money.service';

@Component({
  selector: 'app-not-enough-money',
  templateUrl: './not-enough-money.component.html',
  styleUrls: ['./not-enough-money.component.scss']
})
export class NotEnoughMoneyComponent {

  constructor(private dialogRef: MatDialogRef<NotEnoughMoneyComponent>,
              private moneyService: MoneyService) { }

  addMoney(): void {
    this.moneyService.addMoney();
    this.moneyService.setNotEnoughMoney(false);
    this.dialogRef.close();
  }
}
