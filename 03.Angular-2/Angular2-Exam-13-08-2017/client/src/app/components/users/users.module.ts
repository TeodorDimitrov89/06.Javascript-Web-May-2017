import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { ProfileComponent } from './profile.component'

import { UsersService } from './users.service';

@NgModule({
  declarations: [
    RegisterComponent,
    ProfileComponent,    
    LoginComponent
  ],
  providers: [
    UsersService,
  ],
  imports: [CommonModule, FormsModule]
})

export class UsersModule { }