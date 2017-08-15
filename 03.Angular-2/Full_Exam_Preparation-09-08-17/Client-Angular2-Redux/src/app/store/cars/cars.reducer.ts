import { ICarsState } from './cars.state';
import { initialState } from './cars.state';

import { 
  ADD_CAR,
  ALL_CARS,
  CAR_DETAILS,
  CAR_LIKE,
  CAR_ADD_REVIEW,
  CAR_ALL_REVIEW,
  CARS_MINE,
  CAR_DELETE
} from './cars.actions';

function addCar(state, action): ICarsState {
  const result = action.result;
  return Object.assign({}, state, {
    carAdded: result.success,
    carAddedId: result.success ? result.car.id: null
  });
}
function allCars(state, action): ICarsState {
  return Object.assign({}, state, {
    allCars: action.cars
  })
}

function carDetails(state, action): ICarsState {
  const car = action.result;
  return Object.assign({}, state, {
    carDetails: car
  })
}
function carLikes(state, action): ICarsState {
  const currentCarLikes = state.carDetails.likes;
  let result = action.result;
  if(result.success) {
    const carDetails = Object.assign({}, state.carDetails, {
      likes: currentCarLikes + 1
    });
    return Object.assign({}, state, {
      carDetails
    })
  }
  return state;
}
function addReview(state, action): ICarsState {
  const result = action.result;
  
  if (result.success) {
    const newReview = result.review;
    const allReviews = state.carReviews;
    return Object.assign({}, state, {
      carReviews: [...allReviews, newReview]
    })
  }
  return state;
}
function allReviews(state, action): ICarsState {
  const carReviews = action.result;
  return Object.assign({}, state, {
    carReviews
  })
}
function myCars(state, action): ICarsState {
  return Object.assign({}, state, {
    myCars: action.cars
  })
}

function carDelete(state, action): ICarsState {
  const myCars = state.myCars.slice(0);
  const carId = +action.id;
  const filtredCars = myCars.filter(car => car.id !== carId);
  return Object.assign({}, state, {
    myCars: filtredCars
  })
}

export function carsReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_CAR: {
      return addCar(state, action);
    }
    case ALL_CARS: {
      return allCars(state, action);
    }
    case CAR_DETAILS: {
      return carDetails(state, action);
    }
    case CAR_LIKE: {
      return carLikes(state, action);
    }
    case CAR_ADD_REVIEW: {
      return addReview(state, action);
    }
    case CAR_ALL_REVIEW: {
      return allReviews(state, action);
    }
    case CARS_MINE: {
      return myCars(state, action);
    }
    case CAR_DELETE: {
      return carDelete(state, action);
    }
    default: return state;
  }
}