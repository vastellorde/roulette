import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HistoryService} from '../helpers/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent implements OnInit {
  gameHistory: any[];
  displayedColumns = ['gameId', 'rate', 'lose'];

  constructor(
    private historyService: HistoryService
  ) { }

  ngOnInit(): void {
    this.gameHistory = this.historyService.getGameHistory();
    console.log(this.gameHistory);
  }

}
