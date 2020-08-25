import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NotEnoughMoneyComponent} from '../../shared/not-enough-money/not-enough-money.component';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {
  private moneySubject$ = new BehaviorSubject<number>(1000);
  private noEnoughMoneySubject$ = new BehaviorSubject<boolean>(false);

  get money$(): Observable<number> {
    return this.moneySubject$.asObservable();
  }

  get noEnoughMoney$(): Observable<boolean> {
    return this.noEnoughMoneySubject$.asObservable();
  }

  setNotEnoughMoney(state: boolean): void {
    this.noEnoughMoneySubject$.next(state);
  }

  addMoney(): void {
    this.moneySubject$.next(this.moneySubject$.value + 1000);
  }

  putMoney(money: number): void {
    if (this.moneySubject$.value < money) {
      this.setNotEnoughMoney(true);
      return;
    }
    this.moneySubject$.next(this.moneySubject$.value - money);
  }
}

