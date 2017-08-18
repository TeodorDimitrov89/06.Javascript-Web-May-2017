import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/app.state';

import { AddAnimalModel } from './add-animal.model';
import { AnimalsActions } from '../store/animals/animals.actions';

@Component({
  selector: 'add-animal',
  templateUrl: './add-animal.component.html'
})

export class AddAnimalComponent {
  animal: AddAnimalModel = new AddAnimalModel('Thomas', 21, 'black', 'Cat', 20000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYh1R8qA-akJf2XqmdUOgSblc1yzR91M5D4DVu3412a-DvekYyqg', '');
  animalTypes: Array<string> = ['Cat', 'Dog', 'Bunny', 'Exotic', 'Other'];
  private sub: any;
  constructor(
    private animalsActions: AnimalsActions,
    private ngRedux: NgRedux<IAppState>,
    private router: Router
  ) { }

  addAnimal() {
    const animal = this.animal;
    this.animalsActions.add(animal);
    this.sub = this.ngRedux
      .select(state => state.animals)
      .subscribe(animalsState => {
        if (animalsState.animalAdded) {
          const animalId = animalsState.animalAddedId;
          this.router.navigateByUrl(`/animals/details/${animalId}`);
        }
      })
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}