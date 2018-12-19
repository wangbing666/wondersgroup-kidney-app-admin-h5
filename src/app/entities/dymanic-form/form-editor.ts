import { FormBase } from './form-base';

export class FormEditor extends FormBase <string> {
  controlType = 'editor';
  size: string;

  constructor(options: {} = {}) {
    super(options);
    this.size = options['size'] || '30';
  }
}
