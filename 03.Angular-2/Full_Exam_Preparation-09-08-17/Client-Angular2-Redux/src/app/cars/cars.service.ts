import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { AddCarModel } from  './add-car.model';

@Injectable()
export class CarsService {
  constructor(
    private httpService: HttpService
  ) {}

  addCar(car: AddCarModel) {
    return this.httpService.post('cars/create', car, true);
  }
  allCars(page: number = 1, searchText: string = null) {
    let url = `cars/all?page=${page}`;
    if (searchText) {
      url += `&search=${searchText}`
    }

    return this.httpService.get(url);
  }
  getDetails(id: number) {
    return this.httpService.get(`cars/details/${id}`, true);
  }
  likes (id: number) {
    return this.httpService.post(`cars/details/${id}/like`, {}, true)
  }
  addReview(id:number, review: object) {
    return this.httpService
      .post(`cars/details/${id}/reviews/create`,
      review,
      true);
  }
  allReviews(id: number) {
    return this.httpService.get(`cars/details/${id}/reviews`, true);
  }
  myCars () {
    return this.httpService.get(`cars/mine`, true);
  }
  deleteCar (id: number) {
    return this.httpService.post(`cars/delete/${id}`, {}, true);
  }
}