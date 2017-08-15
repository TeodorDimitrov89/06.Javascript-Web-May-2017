import { NavigationStart } from '@angular/router';

import { USER_LOGGED_IN } from '../store/users/users.actions';
import { ROUTES_CHANGE } from '../store/core/core.actions'; 
export function config (ngRedux, router, authService) {
 router.events.subscribe(ev => {
      if(ev instanceof NavigationStart) {
        ngRedux.dispatch({
          type:ROUTES_CHANGE
        })
      }
    });

    if(authService.isUserAuthenticated()) {
      const token = authService.getToken();
      const username = authService.getUser();
      ngRedux.dispatch({
        type:USER_LOGGED_IN,
        result: {
            success: true,
            token,
            user: {
              name: username
            }
          }
      })
    }
}