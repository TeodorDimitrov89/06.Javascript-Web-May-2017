import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {
  authenticated: boolean = false;
  username: string = null;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
     this.router.events.subscribe(ev => {
      if(ev instanceof NavigationStart) {
          this.authenticated = this.authService.isUserAuthenticated();
          this.username = this.authService.getUser();
      }
    });
  }
  logout() {
    this.authenticated = false;
    this.authService.deauthenticateUser();
    this.authService.removeUser();
    this.router.navigateByUrl('');
  }
}