import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { InspectionItemService, InspectionItemTableService } from './_service';

import { InspectionItemComponent } from './inspection-item.component';
import { InspectionItemEditComponent } from './inspection-item-edit';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: InspectionItemComponent
      }
    ]),
    DynamicTableModule, 
    DynamicFormModule, 
    EditModule, 
    ModalModule
  ],
  declarations: [
    InspectionItemComponent,
    InspectionItemEditComponent
  ],
  providers: [
    InspectionItemService, 
    InspectionItemTableService
  ]
})
export class InspectionItemModule {

}