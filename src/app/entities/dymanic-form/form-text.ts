import { FormBase } from './form-base';

export class FormText extends FormBase<string> {
  controlType = 'text';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || 'text';
  }
}
