import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  checkToken() {
    return !!localStorage.getItem('token');
  }
}