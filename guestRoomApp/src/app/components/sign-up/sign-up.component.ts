import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "./User.model";
import { UsersService } from "../../services/users.service";
import { emailErrors } from "../../enums/userErrors";
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation
} from "angular-animations";
import { UserNameValidators } from "./username.validator";
import { mimeType } from "./mime.type.validator";
import { Router } from "@angular/router";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()]
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  emailError = emailErrors.required;
  imagePreview;

  constructor(public usersService: UsersService, public router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      _userName: new FormControl("", {
        validators: [
          Validators.required,
          Validators.minLength(3),
          UserNameValidators.cannotContainSpace
        ]
      }),
      _email: new FormControl("", {
        validators: [Validators.required],
        asyncValidators: UserNameValidators.uniqeEmail(this.usersService)
      }),
      _password: new FormControl("", {
        validators: [Validators.required]
      }),
      _phone: new FormControl("", {
        validators: [Validators.required]
      }),
      image: new FormControl("", {
        validators: Validators.required,
        asyncValidators: mimeType
      })
    });
  }

  get username() {
    return this.form.get("_userName");
  }
  get email() {
    return this.form.get("_email");
  }
  get password() {
    return this.form.get("_password");
  }
  get phone() {
    return this.form.get("_phone");
  }
  get image() {
    return this.form.get("image");
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file }); //allow to patch a single control
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }
  onSubmit() {
    if (!this.form.valid) return;

    const user: User = {
      _id: null,
      _userName: this.form.value._userName,
      _email: this.form.value._email,
      _password: this.form.value._password,
      _phone: this.form.value._phone,
      imagePath: null
    };
    this.usersService.addUser(user, this.form.value.image).subscribe(
      result => {
        console.log(result);
        this.router.navigate(["/"]);
      },
      error => {
        this.emailError = error.error.massage;
        console.log(error);
        alert("error send form to server");
      }
    );

    console.log("form submited");
    return false;
  }

}
