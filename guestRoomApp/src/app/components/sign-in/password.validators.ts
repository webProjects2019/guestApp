import { FormControl, AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidators {
  static currectOldPass(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      if (control.value !== "abc") resolve({ currectOldPass: true });
      else resolve(null);
    });
  }
  static passwordsShouldMatch(control: AbstractControl) {
    let newPassword = control.get("confirmeNewPassword");
    let confirmNewPassword = control.get("newPassword");
    console.log(newPassword.value, confirmNewPassword.value);
    if(newPassword.value !== confirmNewPassword.value)
    console.log("is not even")
    else
    console.log("is  even")
    if (newPassword.value !== confirmNewPassword.value)
      return { passwordsShouldMatch: true };
    return null;
  }
}
