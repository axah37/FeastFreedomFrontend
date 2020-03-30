import { Directive, Input } from "@angular/core";
import {
  Validator,
  FormGroup,
  ValidationErrors,
  NG_VALIDATORS,
  AbstractControl
} from "@angular/forms";

@Directive({
  selector: "[appOpenClose]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: OpenCloseDirective, multi: true }
  ]
})
export class OpenCloseDirective implements Validator {
  @Input() open: string;

  validate(c: AbstractControl): { [key: string]: any } {
    return c.value <= c.parent.value.start ? { openCloseError: true } : null;
  }
}
