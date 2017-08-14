import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatsComponent } from './components/stats/stats.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile.component';

import { AddAnimalComponent } from './components/animals/add-animal.component';
import { ListAnimalsComponent } from './components/animals/list-animals.component';
import { AnimalDetailsComponent } from './components/animals/animal-details.component';

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
    path: 'animals',
    children: [
      { path: 'add', component: AddAnimalComponent, canActivate: [PrivateRoute] },
      { path: 'all', component: ListAnimalsComponent },
      { path: 'details/:id', component: AnimalDetailsComponent, canActivate: [PrivateRoute] }
    ]
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class CarRoutesModule { }