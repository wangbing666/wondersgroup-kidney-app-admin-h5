import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormBase } from '../../entities/';

import { DFormControlService } from './dform-control.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.html',
  styleUrls: ['dynamic-form.css']
})
export class DynamicForm implements OnInit {

  @Input() button: string;
  @Input() reset: boolean;

  @Input() formDatas: FormBase < any > [] = [];
  @Output() formValues = new EventEmitter();

  form: FormGroup;

  constructor(private fcs: DFormControlService) {}

  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.formDatas);
  }

  onSubmit() {
    this.formValues.emit(this.form.value);
  }

}
