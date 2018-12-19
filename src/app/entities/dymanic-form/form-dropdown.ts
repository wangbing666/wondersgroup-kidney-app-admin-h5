import { FormBase } from './form-base';

export class FormDropdown extends FormBase<string> {
  controlType = 'dropdown';
  options: { id: string, name: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
