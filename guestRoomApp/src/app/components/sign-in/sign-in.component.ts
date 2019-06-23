import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PasswordValidators } from "./password.validators";
import { AuthData } from '../../services/auth.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  constructor(public authService:UsersService) {}
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl("", {
        validators: Validators.required
      }),
      password: new FormControl("", { validators: [Validators.required] })
    });
  }
  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }

  onSubmit() {
    if (this.form.invalid) return;
    const authData:AuthData={
      email:this.form.value.email,
      password:this.form.value.password
    }
    this.authService.login(authData);
    console.log(this.form);
    return false;
  }
}
