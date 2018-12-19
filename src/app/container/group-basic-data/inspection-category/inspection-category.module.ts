import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { InspectionCategoryService, InspectionCategoryTableService, InspectionCategoryFormService } from './_service';

import { InspectionCategoryComponent } from './inspection-category.component';
import { InspectionCategoryEditComponent } from './inspection-category-edit';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: InspectionCategoryComponent
      }
    ]),
    DynamicTableModule, 
    DynamicFormModule, 
    EditModule, 
    ModalModule
  ],
  declarations: [
    InspectionCategoryComponent,
    InspectionCategoryEditComponent
  ],
  providers: [
    InspectionCategoryService, 
    InspectionCategoryTableService,
    InspectionCategoryFormService
  ]
})
export class InspectionCategoryModule {

}