import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrivateRoute } from './private-route';

import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { ErrorsHandlerService } from './errors-handler.service';

import { NavbarComponent } from './navbar.component';

import { ToastrService } from './toastr.service';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    HttpService,
    ToastrService,
    ErrorsHandlerService,
    PrivateRoute,
    AuthService
  ],
  exports: [
    NavbarComponent
  ]
})

export class CoreModule { }