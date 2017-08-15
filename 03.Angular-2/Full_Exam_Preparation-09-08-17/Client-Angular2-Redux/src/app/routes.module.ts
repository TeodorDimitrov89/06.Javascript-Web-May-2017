import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './users/register.component';
import { LoginComponent } from './users/login.component';
import { ProfileComponent } from './users/profile.component';

import { StatsComponent } from './stats/stats.component';

import { AddCarComponent } from './cars/add-car.component';
import { ListCarsComponent } from './cars/list-cars.component';
import { CarDetailsComponent } from './cars/car-details.component';

import { PrivateRoute } from './core/private-route';

const routes: Routes = [
  { path: '', component: StatsComponent },  
  { path: 'users', 
  children: [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
  ] 
},

  { path: 'cars',
    children: [
      { path: 'add', component: AddCarComponent, canActivate: [PrivateRoute] },
      { path: 'all', component: ListCarsComponent },
      { path: 'details/:id', component: CarDetailsComponent, canActivate: [PrivateRoute] },
    ]
  },
  
  
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class CarRoutesModule { }