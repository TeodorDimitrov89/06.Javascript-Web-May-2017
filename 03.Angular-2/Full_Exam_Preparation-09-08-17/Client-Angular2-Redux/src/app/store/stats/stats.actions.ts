import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { StatsService } from '../../stats/stats.service';
import { IAppState } from '../app.state';

export const STATS_REQUESTED = 'stats/requested';

@Injectable()
export class StatsAction {
  constructor(
    private statsService: StatsService,
    private ngRedux: NgRedux<IAppState>
  ) {}
  get() {
    this.statsService.get()
      .subscribe(stats => {
        this.ngRedux.dispatch({
          type: STATS_REQUESTED,
          stats
        })
      })
  }
}