import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginUserModel } from './login-user.model';

import { AuthService } from '../../../core/auth.service';
import { ToastrService } from '../../../core/toastr.service';
import { UsersService } from '../users.service';
import { ErrorsHandlerService } from '../../../core/errors-handler.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  user: LoginUserModel = new LoginUserModel();

  constructor(
    private toastrService: ToastrService,
    private usersService: UsersService,
    private errorsHandlerService: ErrorsHandlerService,
    private authService: AuthService,
    private router: Router
  ) {}
  login(): void {
    this.usersService
      .login(this.user)
      .then(response => {
        if(response.success) {
          const username = response.user.name;
          const token = response.token;
          this.authService.saveUser(username);
          this.authService.authenticateUser(token);
          this.toastrService.success(response['message']);
          this.router.navigateByUrl('');
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