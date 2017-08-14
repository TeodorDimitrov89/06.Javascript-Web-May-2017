import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../animals/animals.service';
import { Router } from '@angular/router';

import { ToastrService } from '../../core/toastr.service';
import { ErrorsHandlerService } from '../../core/errors-handler.service';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  animals: Array<object> = [];
  constructor(
    private toastrService: ToastrService,
    private animalsService: AnimalsService,
    private errorsHandlerService: ErrorsHandlerService
  ){}

  ngOnInit() {
    this.getMyAnimals();
  }

  delete(id:number) {
    this.animalsService
      .delete(+id)
      .then(response => {
        if (response.success) {
          this.animals = this.animals.filter(animals => animals['id'] !== id);
          this.toastrService.success(response.message);
        } else {
          this.toastrService.error(response.message);
        }
      })
  }
  getMyAnimals() {
    this.animalsService
      .myAnimals()
      .then(response => {
        this.animals = response;
      })
      .catch(err => {
        const errorMessage = this.errorsHandlerService.handleGlobalError(err);
        this.toastrService.error(errorMessage);
      });
  }
}