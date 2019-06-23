import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from "../components/sign-up/User.model";
import { Subject, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { AuthData } from './auth.model';

@Injectable({
  providedIn: "root"
})
export class UsersService {
  token:string;
  private isAuth=false;
  isAuthListener=new Subject<boolean>()
  isEmailExistUpdated = new Subject<boolean>();
  _USERS_URL = "http://localhost:5000/api/users";
  constructor(public http: HttpClient) {}
  addUser(user: User, image: File) {
    const postData = new FormData(); //allow us to format text value and files
    postData.append("_userName", user._userName);
    postData.append("_email", user._email);
    postData.append("_password", user._password);
    postData.append("_phone", user._phone);
    postData.append("image", image, user._userName);

    return this.http.post(this._USERS_URL+"/signup", postData);
  }
  updatedEmailIsExistListener() {
    return this.isEmailExistUpdated.asObservable();
  }
  isEmailExist(email: string) {
    console.log("is email exist bf subscribe");
    this.http
      .get<{ isExist: boolean }>(this._USERS_URL + "/" + email)
      .subscribe(
        res => {
          this.isEmailExistUpdated.next(res.isExist);
          console.log(res.isExist, "service");
        }
      );
  }
  getIsAuthListener(){
    return this.isAuthListener.asObservable()
  }
  getAuth(){
    return this.isAuth;
  }
  login(authData:AuthData){
    this.http.post<{expiresIn:number,token:string}>(this._USERS_URL+"/login",authData).subscribe(response=>{
      console.log(response.token)
      const token=response.token;
      if(token){
        this.isAuth=true;
        this.isAuthListener.next(true)

      }
    })
  }
  handleError(err: HttpErrorResponse) {
    return throwError(err.message || "server error");
  }
}
