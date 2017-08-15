import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../app.state';
import { CarsService } from '../../cars/cars.service';
import { AddCarModel } from '../../cars/add-car.model';
import { CarReviewModel } from '../../cars/car-review.model';

export const ADD_CAR = 'car/ADD';
export const ALL_CARS = 'cars/ALL';
export const CAR_DETAILS = 'car/DETAILS';
export const CAR_LIKE = 'car/LIKE';
export const CAR_ADD_REVIEW = 'car/ADD_REVIEW';
export const CAR_ALL_REVIEW = 'car/ALL_REVIEW';
export const CARS_MINE = 'cars/MINE';
export const CAR_DELETE = 'car/DELETE';

@Injectable()
export class CarsActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private carsService: CarsService
  ) {}

  addCar(car: AddCarModel): void {
    this.carsService
      .addCar(car)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: ADD_CAR,
          result
        })
      })
  }
  allCars(page:number = 1, searchText:string = null) {
    this.carsService
      .allCars(page, searchText)
      .subscribe(cars => {
        this.ngRedux.dispatch({
          type: ALL_CARS,
          cars
        })
      })
  }
  carDetails(id: number) {
    this.carsService
      .getDetails(id)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: CAR_DETAILS,
          result
        })
      })
  }
  carLikes (id:number) {
    this.carsService
      .likes(id)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: CAR_LIKE,
          result
        })
      })
  }
  addReview(id:number, review:CarReviewModel) {
    this.carsService
    .addReview(id,review)
    .subscribe(result => {
      this.ngRedux.dispatch({
        type: CAR_ADD_REVIEW,
        result
      })
    });
  }
  allReviews(id: number) {
    this.carsService
      .allReviews(id)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: CAR_ALL_REVIEW,
          result
        })
      })

  }
  myCars() {
    this.carsService
      .myCars()
      .subscribe(cars => {
        this.ngRedux.dispatch({
          type: CARS_MINE,
          cars
        })
      })
  }
  deleteCar (id: number) {
    this.carsService
      .deleteCar(id)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: CAR_DELETE,
          id
        })
      });
  }
}