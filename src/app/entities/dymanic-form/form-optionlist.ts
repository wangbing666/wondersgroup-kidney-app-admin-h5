import { FormBase } from './form-base';

export class FormOptionList extends FormBase<string> {
  controlType = 'optionlist';

  constructor(options: {} = {}) {
    super(options);
  }
}
