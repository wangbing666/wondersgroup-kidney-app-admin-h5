import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { TabModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { DepartmentService, DepartmentTableService, DepartmentFormService } from './_service';

import { AuthService } from '../../../services';

import { DepartmentComponent } from './department.component';
import { DepartmentEditComponent } from './department-edit';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: DepartmentComponent
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
    DepartmentComponent,
    DepartmentEditComponent
  ],
  providers: [
    DepartmentService,
    DepartmentTableService,
    DepartmentFormService
  ]
})
export class DepartmentModule {}
