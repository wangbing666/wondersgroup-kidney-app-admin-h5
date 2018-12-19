import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TabModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { DoctorTitleService, DoctorTitleTableService ,DoctorTitleFormService} from './_service';

import { AuthService } from '../../../services';

import { DoctorTitleComponent } from './doctor-title.component';
import { DoctorTitleEditComponent } from './doctor-title-edit';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: DoctorTitleComponent
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
    DoctorTitleComponent,
    DoctorTitleEditComponent
  ],
  providers: [
   DoctorTitleService,
   DoctorTitleTableService,
   DoctorTitleFormService
  ]
})
export class DoctorTitleModule {}