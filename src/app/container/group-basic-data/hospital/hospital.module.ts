import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TabModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { HospitalService, HospitalFormService, HospitalTableService } from './_service';

import { AuthService } from '../../../services';

import { HospitalComponent } from './hospital.component';
import { HospitalEditComponent } from './hospital-edit';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: HospitalComponent
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
    HospitalComponent,
    HospitalEditComponent
  ],
  providers: [
    HospitalService,
    HospitalFormService,
    HospitalTableService
  ]
})
export class HospitalModule {}
