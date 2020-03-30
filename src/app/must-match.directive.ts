import { Directive, Input } from "@angular/core";
import {
  FormGroup,
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  AbstractControl
} from "@angular/forms";

@Directive({
  selector: "[appMustMatch]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true }
  ]
})
export class MustMatchDirective implements Validator {
  validate(c: AbstractControl): { [key: string]: any } {
    return c.value !== c.parent.value.providerPassword
      ? { matchError: true }
      : null;
  }
}
