import { Injectable } from '@angular/core';

export class AuthService {
  saveUser(user) {
    // window.localStorage.setItem('user', JSON.stringify(user))
    window.localStorage.setItem('user', user);
  }
  getUser() {
    return window.localStorage.getItem('user');
    //const userJson = window.localStorage.getItem('user');
    // if (userJson) {
    //   return JSON.parse(userJson);
    // }
    // return {};
  }
  removeUser() {
    window.localStorage.removeItem('user');
  }
  authenticateUser(token) {
    window.localStorage.setItem('token', token);
  }
  isUserAuthenticated() {
    return window.localStorage.getItem('token') !== null;
  }
  deauthenticateUser() {
    window.localStorage.removeItem('token');
  }
  getToken() {
    return window.localStorage.getItem('token');
  }
}
