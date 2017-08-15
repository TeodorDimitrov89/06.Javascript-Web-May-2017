import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';

import { UsersService } from './users.service';
import { UsersActions } from '../store/users/users.actions';
import { CarsActions } from '../store/cars/cars.actions';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  providers: [
    UsersService,
    UsersActions,
    CarsActions
  ],
  imports: [CommonModule, FormsModule]
})

export class UsersModule { }