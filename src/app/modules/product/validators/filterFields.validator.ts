import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";

/**
 * Validation du filtre d'affichage produits
 * @returns {ValidatorFn}
 */
export function filterProductsFieldsValidator(filterProductsFg: FormGroup): boolean {
  if (!(filterProductsFg instanceof FormGroup))
    return false;

  const hasValue = Object.values(filterProductsFg.controls).some(control => {
      const value = control.value;
      return value !== null && value !== undefined && value.toString().trim() !== '';
    });

    return hasValue;
};

