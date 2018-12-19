import { FormBase } from './form-base';

export class FormCheckbox extends FormBase<string> {
  controlType = 'checkbox';
  options: { id: string, name: string, checked: boolean }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
