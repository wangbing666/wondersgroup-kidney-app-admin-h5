import { FormBase } from './form-base';

export class FormTextarea extends FormBase<string> {
  controlType = 'textarea';
  size: string;

  constructor(options: {} = {}) {
    super(options);
    this.size = options['size'] || '30';
  }
}
