import { AbstractControl, ValidationErrors } from "@angular/forms";

export function validateNumber(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const regex = /^\d+([.]\d+)?$/;

  return regex.test(value) ? null : { validateNumber: true };
}
