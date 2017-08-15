import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';

import { AddCarModel } from './add-car.model';
import { IAppState } from '../store/app.state';


import { CarsActions } from '../store/cars/cars.actions';

@Component({
  selector: 'add-car',
  templateUrl: './add-car.component.html'
})

export class AddCarComponent {
  car: AddCarModel = new AddCarModel();

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private carsActions: CarsActions,
    private router: Router
  ) {}
  addCar() {
    const car = this.car;
    this.carsActions.addCar(car);
    let subscription = this.ngRedux
      .select(state => state.cars)
      .subscribe(cars => {
        if(cars.carAdded) {
          const carId = cars.carAddedId;
          subscription.unsubscribe();
          this.router.navigateByUrl(`/cars/details/${carId}`);
        }
      })
  }
}