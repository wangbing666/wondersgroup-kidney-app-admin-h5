import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase } from '../../entities';

/**
 * Our custom validator
 *
 * A validator:
 * - Takes a `Control` as it's input and
 * - Returns a `StringMap<string, boolean>` where the key is "error code" and
 *   the value is `true` if it fails
 */
function lengthValidator(control: FormControl): {
  [s: string]: boolean
} {
  if (control.value.length > 20) {
    return { invalidName: true };
  }
}

@Injectable()
export class DFormControlService {
  constructor() {}

  toFormGroup(forms: FormBase < any > []) {
    let group: any = {};

    forms.forEach(form => {
      if (form.validated) {
        group[form.key] = new FormControl({
            value: form.value == 0 ? form.value : form.value || '',
            disabled: form.disabled
          },
          Validators.compose([
            Validators.required,
            lengthValidator
          ]))
      } else {
        group[form.key] = form.required ?
          new FormControl({
              value: form.value == 0 ? form.value : form.value || '',
              disabled: form.disabled
            },
            Validators.compose([
              Validators.required
            ])) :
          new FormControl({
            value: form.value == 0 ? form.value : form.value || '',
            disabled: form.disabled
          });
      }
    });

    return new FormGroup(group);
  }
}
