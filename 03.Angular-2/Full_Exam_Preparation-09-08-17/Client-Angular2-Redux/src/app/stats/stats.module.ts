import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsComponent } from './stats.component';

import { StatsService } from './stats.service';
import { StatsAction } from '../store/stats/stats.actions';

@NgModule({
  declarations: [StatsComponent],
  imports: [CommonModule],
  providers: [StatsService, StatsAction]
})

export class StatsModule {}