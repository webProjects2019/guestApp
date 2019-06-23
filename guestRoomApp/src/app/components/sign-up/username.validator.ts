import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from "@angular/forms";
import { Observable } from "rxjs";
import { UsersService } from "../../services/users.service";
export class UserNameValidators {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(" ") != -1)
      return { cannotContainSpace: true };

    return null;
  }

  static uniqeEmail(userService: UsersService): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      if (control.value) {
        userService.isEmailExist(control.value);

        return new Promise((resolve, reject) => {
          userService.updatedEmailIsExistListener().subscribe(res => {
            res ? resolve({ emailExist: true }) : resolve(null);
          },error=>{
            console.log(error)
          });
        });
      }
    };
  }
}
