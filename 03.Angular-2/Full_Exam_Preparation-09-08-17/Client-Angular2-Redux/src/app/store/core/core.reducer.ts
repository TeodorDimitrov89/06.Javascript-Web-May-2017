import { initialState } from './core.state';
import { ICoreState } from './core.state';
import { ROUTES_CHANGE } from './core.actions';

function handleMessage(state, action) {
  const result = action.result;
  if (result) {
    let message = result.message;
    let errors = result.errors;
    if (errors) {
      const keys = Object.keys(errors);
      if (keys.length > 0) {
        const firstKeyError = Object.keys(result.errors)[0];
        message = errors[firstKeyError];
      }
    }
    if (message) {
      return Object.assign({}, state, {
        message
      })
    }
  }

  return state;
}

function routeChange(state, action) {
  return Object.assign({}, state, {
    message: null
  })
}
export function coreReducer(state = initialState, action) {
  if (action.type === ROUTES_CHANGE) {
    return routeChange(state, action);
  } else {
    return handleMessage(state, action);
  }
}
