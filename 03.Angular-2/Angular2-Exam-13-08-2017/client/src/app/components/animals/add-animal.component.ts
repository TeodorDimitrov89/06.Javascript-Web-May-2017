import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AddAnimalModel } from './add-animals.model';

import { AuthService } from '../../core/auth.service';

import { AnimalsService } from './animals.service';
import { ToastrService } from '../../core/toastr.service';
import { ErrorsHandlerService } from '../../core/errors-handler.service';

@Component({
  selector: 'add-animal',
  templateUrl: './add-animal.component.html'
})

export class AddAnimalComponent {
  animal: AddAnimalModel = new AddAnimalModel();
  constructor(
    private toastrService: ToastrService,
    private animalsService: AnimalsService,
    private errorsHandlerService: ErrorsHandlerService,
    private router: Router
  ) { }
  addAnimal() {
    let animal = this.animal;
    this.animalsService
      .addAnimal(animal)
      .then(response => {
        if (response.success) {
          this.toastrService.success(response['message']);
          const id = response.animal.id;
          this.router.navigateByUrl(`/animals/details/${id}`);
        } else {
          const error = this.errorsHandlerService.handleErrors(response);
          this.toastrService.error(error);
        }
      })
      .catch(err => {
        const error = this.errorsHandlerService.handleGlobalError(err);
        this.toastrService.error(error);
      });
  }
}