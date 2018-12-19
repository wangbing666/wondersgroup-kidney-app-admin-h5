import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormSet } from './dynamic-form-set';
import { DynamicForm } from './dynamic-form';
import { ModalModule } from '../modal';
import { DFormControlService } from './dform-control.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [
    DynamicFormSet,
    DynamicForm
  ],
  exports: [
    DynamicForm
  ],
  providers: [
    DFormControlService
  ]
})
export class DynamicFormModule {}
