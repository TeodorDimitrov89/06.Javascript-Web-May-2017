import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrivateRoute } from './private-route';

import { HttpService } from './http.service';
import { AuthService } from './auth.service';

import { NavbarComponent } from './navbar.component';
import { MessageHandlerComponent } from './message-handler.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MessageHandlerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    HttpService,
    PrivateRoute,
    AuthService
  ],
  exports: [
    NavbarComponent,
    MessageHandlerComponent
  ]
})

export class CoreModule { }