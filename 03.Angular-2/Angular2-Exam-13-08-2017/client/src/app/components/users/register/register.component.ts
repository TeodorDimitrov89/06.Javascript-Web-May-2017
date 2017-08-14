import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterUserModel } from './register-user.model';
import { ToastrService } from '../../../core/toastr.service';
import { ErrorsHandlerService } from '../../../core/errors-handler.service';

import { UsersService } from '../users.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  user: RegisterUserModel = new RegisterUserModel();
  constructor(
    private toastrService: ToastrService,
    private usersService: UsersService,
    private errorsHandlerService: ErrorsHandlerService,
    private router: Router
  ) {}
  register(): void {
    this.usersService
      .register(this.user)
      .then(response => {
        if(response.success) {
          this.router.navigateByUrl('users/login');
          this.toastrService.success(response['message']);
        } else {
          let error = this.errorsHandlerService.handleErrors(response);
          this.toastrService.error(error);
        }
      })
      .catch(err => {
        this.toastrService.error(this.errorsHandlerService.handleGlobalError(err));
      })
  }
}
