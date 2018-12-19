import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from '../dynamic-form';

import { FormBase } from '../../entities/';

@Component({
  selector: 'edit-component',
  templateUrl: 'edit-component.html',
  styleUrls: ['edit-component.css']
})
export class EditComponent implements OnInit {
  @Input() modalTitle: string;
  @Input() errorMessage: string;
  @Input() formDatas: FormBase < any > [] = [];
  @Output() valueEmmit: EventEmitter < any > = new EventEmitter();
  @Output() closeEmmit: EventEmitter < any > = new EventEmitter();

  constructor() {}

  ngOnInit() {
    document.body.scrollTop = 0;
  }

  getValues(data) {
    this.valueEmmit.emit(data);
  }

  close() {
    this.closeEmmit.emit();
  }

}

@NgModule({
  imports: [
    CommonModule,
    DynamicFormModule
  ],
  declarations: [
    EditComponent
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule {}
