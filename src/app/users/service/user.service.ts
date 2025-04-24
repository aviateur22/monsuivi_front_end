import { Injectable, signal } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = signal<User | null>(null);

  constructor() { }

  setUser(user: User) {
    this.user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser = this.user.asReadonly();

  loadUserFromStorage() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.user.set(JSON.parse(stored));
    }
  }

  fakeUser() {
    var fakeUser: User = {
      email: 'helixia22@hotmail.fr',
      userId: "1",
      jwt: '',
      role: 'seller'
    }

    this.setUser(fakeUser)
  }
}
