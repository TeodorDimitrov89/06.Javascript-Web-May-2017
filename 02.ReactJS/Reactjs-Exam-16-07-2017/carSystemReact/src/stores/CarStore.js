import { EventEmitter } from 'events'
import dispatcher from '../dispatcher/dispatcher'
import carActions from '../actions/CarActions'
import CarData from '../data/CarData'

class CarStore extends EventEmitter {
  createCar (car) {
    CarData
      .create(car)
      .then(data => this.emit(this.eventTypes.CAR_CREATED, data))
  }
  allCars (page, search) {
    page = page || 1
    CarData
    .all(page, search)
    .then(data => this.emit(this.eventTypes.CARS_RETRIEVED, data))
  }
  byId (id) {
    CarData
      .byId(id)
      .then(data => this.emit(this.eventTypes.CAR_DETAILS_RETRIEVED, data))
  }
  addReview (id, review) {
    CarData
      .addReview(id, review)
      .then(data => this.emit(this.eventTypes.REVIEW_ADDED, data))
  }

  allReviews (id) {
    CarData
      .allReviews(id)
      .then(data => this.emit(this.eventTypes.REVIEWS_RETRIEVED, data))
  }

  like (id) {
    CarData
      .likes(id)
      .then(data => this.emit(this.eventTypes.CAR_LIKED, data))
  }
  profile () {
    CarData
      .profile()
      .then(data => this.emit(this.eventTypes.PROFILE_RETRIEVED, data))
  }
  deleteCar (id) {
    CarData
      .deleteCar(id)
      .then(data => this.emit(this.eventTypes.CAR_DELETED, data))
  }
  handleActions (action) {
    switch (action.type) {
      case carActions.types.CREATE_CAR: {
        this.createCar(action.car)
        break
      }
      case carActions.types.ALL_CARS: {
        this.allCars(action.page, action.search)
        break
      }
      case carActions.types.CAR_DETAILS: {
        this.byId(action.id)
        break
      }
      case carActions.types.ADD_REVIEW: {
        this.addReview(action.id, action.review)
        break
      }
      case carActions.types.ALL_REVIEWS: {
        this.allReviews(action.id)
        break
      }
      case carActions.types.CAR_LIKES: {
        this.like(action.id)
        break
      }
      case carActions.types.USER_PROFILE: {
        this.profile()
        break
      }
      case carActions.types.CAR_DELETE: {
        this.deleteCar(action.id)
        break
      }
      default: break
    }
  }
}
let carStore = new CarStore()

carStore.eventTypes = {
  CAR_CREATED: 'car_created',
  CARS_RETRIEVED: 'cars_retrieved',
  CAR_DETAILS_RETRIEVED: 'car_details_retrieved',
  REVIEW_ADDED: 'review_added',
  REVIEWS_RETRIEVED: 'reviews_retrieved',
  CAR_LIKED: 'car_liked',
  PROFILE_RETRIEVED: 'profile_retrieved',
  CAR_DELETED: 'car_deleted'
}

dispatcher.register(carStore.handleActions.bind(carStore))

export default carStore
