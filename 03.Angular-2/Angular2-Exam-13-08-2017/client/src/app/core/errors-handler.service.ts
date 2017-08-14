import { Injectable } from '@angular/core';

@Injectable()

export class ErrorsHandlerService {
  handleErrors(error) {
   if(!error.success && !error.errors) {
      return error['message']
    } else if (error['errors']) {
      const errs = error.errors
      const keys = Object.keys(errs);
      if (keys.length > 0) {
        const firstKey = keys[0];
        const firstError = errs[firstKey];
        return firstError;
      } 
    }
  }
  handleGlobalError(err) {
    let error = err || 'Sorry, an unknown error has occur, please contact the site administration.';
    if (err && err.status && err.statusText) {
      error = err.statusText;
    } 
    return error;
  }
}