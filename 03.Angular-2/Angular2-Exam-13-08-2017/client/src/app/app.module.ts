import { BrowserModule } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CarRoutesModule } from './routes.module';

import { CoreModule } from './core/core.module';
import { StatsModule } from './components/stats/stats.module';
import { UsersModule } from './components/users/users.module';
import { AnimalsModule } from './components/animals/animals.module';


import { AppComponent } from './app.component';

import { AuthService } from './core/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CarRoutesModule,
    CoreModule,
    StatsModule,
    UsersModule,
    AnimalsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
