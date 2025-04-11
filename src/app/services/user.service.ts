import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { UserResponse } from '../models/userResponse';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  //private users: User[] = [];
  private readonly users : User[] = [];

  // getApiUsers() {
  //   return this.http.get<UserResponse[]>('https://jsonplaceholder.typicode.com/users').pipe(
  //     map(response => {
  //       var users1: User[] = [];
  //       response.forEach(user => {
  //         const u: User = {
  //           id: user.id,
  //           firstName: user.username,
  //           lastName: user.name
  //         };
  //         users1.push(u);
  //       })
  //       return users1;
  //     })
  //   );
  // }

  getApiUsers() {
    return this.http.get<UserResponse[]>('https://jsonplaceholder.typicode.com/users').pipe(
      map(users => users.map(user => ({
        id: user.id,
        firstName: user.username,
        lastName: user.name
      })))
    );
  }

  addApiUser(user: User) {
    return this.http.post<User>(
      'https://jsonplaceholder.typicode.com/users',
      user
    );
  }

  getAllUsers(): User[] {
    if(this.users.length === 0) {
      this.getApiUsers().subscribe((users) => {
        for (const user of users) {
          this.users.push(user);
        }
      });
    }

    return this.users;
  }

  addUser(user: User) {
    user.id = this.users.length + 1;
    this.users.push(user);
  }

  updateUser(user: User) {
    const index = this.users.findIndex((u) => user.id === u.id);
    this.users[index] = user;
  }

  deleteUser(user: User) {
    this.users.splice(this.users.indexOf(user), 1);
  }
}
