import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './users/register.component';
import { LoginComponent } from './users/login.component';
import { ProfileComponent } from './users/profile.component';

import { StatsComponent } from './stats/stats.component';

import { AddAnimalComponent } from './animals/add-animal.component';
import { ListAnimalsComponent } from './animals/list-animals.component';
import { AnimalDetailsComponent } from './animals/animal-details.component';
import { PrivateRoute } from './core/private-route';

const routes: Routes = [
  { path: '', component: StatsComponent },
  {
    path: 'users',
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [PrivateRoute] },
    ]
  },
  {
    path: 'animals', children: [
      { path: 'add', component: AddAnimalComponent, canActivate: [PrivateRoute] },
      { path: 'details/:id', component: AnimalDetailsComponent, canActivate: [PrivateRoute] },
      { path: 'all', component: ListAnimalsComponent }
    ]
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class CarRoutesModule { }