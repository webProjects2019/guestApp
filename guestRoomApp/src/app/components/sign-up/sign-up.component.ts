import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "./User.model";
import { UsersService } from "../../services/users.service";
import { emailErrors } from "../../enums/userErrors";
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation
} from "angular-animations";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()]
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  emailError=emailErrors.required
  emailExist=true

  constructor(public usersService: UsersService) {}

  ngOnInit() {
    this.fitBackgroud();
    this.form = new FormGroup({
      _userName: new FormControl(null, { validators: Validators.required }),
      _email: new FormControl(null, {
        validators: [Validators.required]
      }),
      _password: new FormControl(null, {
        validators: [Validators.required]
      }),
      _phone: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const user: User = {
      _id: null,
      _userName: this.form.value._userName,
      _email: this.form.value._email,
      _password: this.form.value._password,
      _phone: this.form.value._phone
    };
    this.usersService.addUser(user).subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.emailError=error.error.massage
        this.emailExist=true;
        console.log(error);
        alert("email already exist")
        
      }
    );

    console.log("form submited");
    return false;
  }
  fitBackgroud() {
    document.getElementById("sign-up-page-container").style.height =
      window.innerHeight + "px";
  }
}
