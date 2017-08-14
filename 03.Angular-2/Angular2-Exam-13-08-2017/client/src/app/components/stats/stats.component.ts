import { Component, OnInit } from '@angular/core';
import { StatsModel } from './stats.model';
import { StatsService } from './stats.service';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html'
})

export class StatsComponent implements OnInit {
  stats: StatsModel = new StatsModel()
  constructor(
    private statsService: StatsService
) {}
  ngOnInit() {
    this.statsService.get()
    .then(stats => {
      this.stats = stats
    })
    .catch(err => {
      console.log(err)
    })
  }
}
