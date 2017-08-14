import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AnimalsService } from './animals.service';

import { AddAnimalComponent } from './add-animal.component';
import { ListAnimalsComponent } from './list-animals.component';
import { AnimalDetailsComponent } from './animal-details.component';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    AddAnimalComponent,
    ListAnimalsComponent,
    AnimalDetailsComponent
  ],
  providers: [AnimalsService]
})

export class AnimalsModule { }