import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../components/sign-up/User.model";
@Injectable({
  providedIn: "root"
})
export class UsersService {
  _USERS_URL = "http://localhost:5000/api/users";
  constructor(public http: HttpClient) {}
  addUser(user: User) {
    return this.http.post(this._USERS_URL, user)
  }
}
