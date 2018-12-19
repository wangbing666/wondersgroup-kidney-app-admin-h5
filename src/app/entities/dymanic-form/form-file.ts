import { FormBase } from './form-base';

export class FormFile extends FormBase < string > {
  controlType = 'file';
  multiple: boolean;

  constructor(options: {} = {}) {
    super(options);
    this.multiple = options['multiple'] || false;
  }
}
