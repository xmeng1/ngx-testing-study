import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() {
  }
  isAuthenticated(): Promise<boolean> {
    // convert to boolean in force by double exclamations !!
    return Promise.resolve(!!localStorage.getItem('token'));
  }

  isAuthenticatedOld(): boolean {
    return !!localStorage.getItem('token');
  }
}
