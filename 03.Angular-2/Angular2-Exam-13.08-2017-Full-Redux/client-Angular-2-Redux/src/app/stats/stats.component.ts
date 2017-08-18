import { Component, OnInit } from '@angular/core';
import { StatsAction } from '../store/stats/stats.actions';
import { IAppState } from '../store';
import { NgRedux } from 'ng2-redux';
import { StatsModel } from './stats.model';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html'
})

export class StatsComponent implements OnInit {
  stats: StatsModel = new StatsModel();
  constructor(
    private statsAction: StatsAction,
  private ngRedux:NgRedux<IAppState>) {}
  ngOnInit() {
    this.statsAction.get();
    this.ngRedux.select(state => state.stats)
    .subscribe(stats => {
      this.stats = stats;
    });
  }
}
