import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { CarsActions } from '../store/cars/cars.actions';
import { IAppState } from '../store/app.state';
import { CarReviewModel } from './car-review.model';

@Component({
  selector: 'car-details',
  templateUrl: './car-details.component.html'
})

export class CarDetailsComponent implements OnInit {
  private carId: number
  car: object = {};

  review: CarReviewModel = new CarReviewModel(5, '')
  carReviews: Array<CarReviewModel> = []
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute,
    private carsActions: CarsActions
  ) {}
  ngOnInit () {
    this.activatedRoute
      .params
      .subscribe(params => {
        const id = +params['id'];
        this.carId = id;
        this.carsActions.carDetails(id);
        this.ngRedux
          .select(state => state.cars.carDetails)
          .subscribe(car => {
            this.car = car;
          })
        this.carsActions.allReviews(this.carId);
        this.ngRedux.select(state => state.cars.carReviews)
        .subscribe(reviews => {
          this.carReviews = reviews;
        })
      })   
  }
  
  addReview() {
    this.carsActions
      .addReview(this.carId, this.review);
  }
  like () {
    this.carsActions
      .carLikes(this.carId)
      
  }
}