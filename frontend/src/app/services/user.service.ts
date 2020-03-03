import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'http://localhost:4000/api';
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(this.URL + '/users');
  }

  addUser(user) {
    return this.http.post<any>(this.URL + '/users/add',user);
  }

  updateUser(user) {
    return this.http.put<any>(this.URL + '/users/update',user);
  }

  deleteUser(_id) {
    return this.http.put<any>(this.URL + '/users/delete',_id);
  }

}
