import { combineReducers } from 'redux';
import { IAppState } from './app.state';

import { coreReducer } from './core/core.reducer';
import { statsReducer } from './stats/stats.reducer';
import { usersReducer } from './users/users.reducer';
import { carsReducer } from './cars/cars.reducer';

export const reducer = combineReducers<IAppState>({
  users: usersReducer,
  core: coreReducer,
  stats: statsReducer,
  cars: carsReducer
})