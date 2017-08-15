import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/app.state';
import { CarsService } from '../cars/cars.service';
import { CarsActions } from '../store/cars/cars.actions';



@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  myCars: Array<object> = [];
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private carsActions: CarsActions
  ){}

  ngOnInit() {
    this.carsActions.myCars()
    this.ngRedux
      .select(state => state.cars.myCars)
      .subscribe(cars => {
        this.myCars = cars;
      })
  }
  delete (id: number) {
    this.carsActions
      .deleteCar(+id);
  }
}