import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AnimalsService } from './animals.service';
import { AnimalsActions } from '../store/animals/animals.actions';

import { AddAnimalComponent } from './add-animal.component';
import { ListAnimalsComponent } from './list-animals.component';
import { AnimalDetailsComponent } from './animal-details.component';


@NgModule({
  declarations: [
    AddAnimalComponent,
    ListAnimalsComponent,
    AnimalDetailsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [
    AnimalsService,
    AnimalsActions
  ]
})

export class AnimalsModule {}