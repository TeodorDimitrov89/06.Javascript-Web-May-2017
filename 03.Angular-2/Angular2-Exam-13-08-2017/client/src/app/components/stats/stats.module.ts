import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsComponent } from './stats.component';

import { StatsService } from './stats.service';

@NgModule({
  declarations: [StatsComponent],
  imports: [CommonModule],
  providers: [StatsService]
})

export class StatsModule {}