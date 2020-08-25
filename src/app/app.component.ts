import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MoneyService} from './core/helpers/money.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  money$: Observable<number>;
  constructor(private moneyService: MoneyService) {
  }

  ngOnInit(): void {
    this.money$ = this.moneyService.money$;
  }

  addMoney(): void {
    this.moneyService.addMoney();
  }
}
