import dispatcher from '../dispatcher/dispatcher'

const carActions = {
  types: {
    CREATE_CAR: 'CREATE_CAR',
    ALL_CARS: 'ALL_CARS',
    CAR_DETAILS: 'CAR_DETAILS',
    ADD_REVIEW: 'ADD_REVIEW',
    ALL_REVIEWS: 'ALL_REVIEWS',
    CAR_LIKES: 'CAR_LIKES',
    USER_PROFILE: 'USER_PROFILE',
    CAR_DELETE: 'CAR_DELETE'
  },
  createCar (car) {
    dispatcher.dispatch({
      type: this.types.CREATE_CAR,
      car
    })
  },
  all (page, search) {
    page = page || 1
    dispatcher.dispatch({
      type: this.types.ALL_CARS,
      page,
      search
    })
  },
  byId (id) {
    dispatcher.dispatch({
      type: this.types.CAR_DETAILS,
      id
    })
  },
  addReview (id, review) {
    dispatcher.dispatch({
      type: this.types.ADD_REVIEW,
      id,
      review
    })
  },
  allReviews (id) {
    dispatcher.dispatch({
      type: this.types.ALL_REVIEWS,
      id
    })
  },
  likes (id) {
    dispatcher.dispatch({
      type: this.types.CAR_LIKES,
      id
    })
  },
  getProfile () {
    dispatcher.dispatch({
      type: this.types.USER_PROFILE
    })
  },
  deleteCar (id) {
    dispatcher.dispatch({
      type: this.types.CAR_DELETE,
      id
    })
  }
}

export default carActions
