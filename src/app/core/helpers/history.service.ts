import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  public generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  addGame(rate: number, lose: boolean): void {
    const history = localStorage.getItem('games');
    if (history) {
      console.log(JSON.parse(history));
      const newGame = [...JSON.parse(history), {gameId: this.generateId(), lose, rate}];
      localStorage.setItem('games', JSON.stringify(newGame));
    } else {
      localStorage.setItem('games', JSON.stringify([
        {
          gameId: this.generateId(),
          lose,
          rate
        }
      ]));
    }
  }

  getGameHistory(): any[] {
    return JSON.parse(localStorage.getItem('games')) ?? [];
  }
}
