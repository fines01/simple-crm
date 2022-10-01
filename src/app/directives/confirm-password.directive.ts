import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true }]
})
export class ConfirmPasswordDirective {

  @Input('appConfirmPassword') confirmPassword: string[] = [];

  constructor() { }

  match(controlStr: string, checkControlStr: string) {
    return(formGroup: FormGroup) => {

      let control = formGroup.controls[controlStr];
      let checkControl = formGroup.controls[checkControlStr];
      if (checkControl?.errors && !checkControl.errors['validateEqual']) return null;
      if (control?.value !== checkControl?.value) {
        checkControl?.setErrors({validateEqual: true});
        return {validateEqual: true}
      } else {
        checkControl?.setErrors(null);
        return null;
      }
    }
  }

  validate(formGroup: FormGroup): ValidationErrors | null {
    return this.match(this.confirmPassword[0], this.confirmPassword[1])(formGroup);
  }

}


