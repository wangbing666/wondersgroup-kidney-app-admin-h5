import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TabModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { DrugService, DrugFormService, DrugTableService } from './_service';

import { AuthService } from '../../../services';

import { DrugComponent } from './drug.component';
import { DrugEditComponent } from './drug-edit';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: DrugComponent
}];

@NgModule({
  imports: [
    CommonModule,
    TabModule,
    DynamicTableModule,
    DynamicFormModule,
    EditModule,
    ModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DrugComponent,
    DrugEditComponent
  ],
  providers: [
    DrugService,
    DrugFormService,
    DrugTableService
  ]
})
export class DrugModule {}
