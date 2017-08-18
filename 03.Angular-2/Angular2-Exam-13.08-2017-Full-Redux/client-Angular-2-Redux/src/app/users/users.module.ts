import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';

import { UsersService } from './users.service';
import { UsersActions } from '../store/users/users.actions';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  providers: [
    UsersService,
    UsersActions
  ],
  imports: [CommonModule, FormsModule]
})

export class UsersModule { }