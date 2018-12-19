import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TabModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { DoctorServiceService, DoctorServiceTableService ,DoctorServiceFormService} from './_service';

import { AuthService } from '../../../services';

import { DoctorServiceComponent } from './doctor-service.component';
import { DoctorServiceEditComponent} from './doctor-service-edit';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: DoctorServiceComponent
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
    DoctorServiceComponent,
    DoctorServiceEditComponent,
  ],
  providers: [
   DoctorServiceService,
   DoctorServiceTableService,
   DoctorServiceFormService
  ]
})
export class DoctorServiceModule {}