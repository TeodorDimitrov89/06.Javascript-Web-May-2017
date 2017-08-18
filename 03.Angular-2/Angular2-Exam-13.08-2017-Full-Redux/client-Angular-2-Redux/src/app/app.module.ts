import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { NgReduxModule, NgRedux } from 'ng2-redux';
import { store, IAppState } from './store'

import { CarRoutesModule } from './routes.module';

import { CoreModule } from './core/core.module';
import { StatsModule } from './stats/stats.module';
import { UsersModule } from './users/users.module';
import { AnimalsModule } from './animals/animals.module';


import { AppComponent } from './app.component';

import { AuthService } from './core/auth.service';
import { config } from './core/config'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    HttpModule,
    CarRoutesModule,
    CoreModule,
    StatsModule,
    UsersModule,
    AnimalsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private authService: AuthService,
    private router:Router) {
    this.ngRedux.provideStore(store);
    config(ngRedux, router, authService);
  }
}
