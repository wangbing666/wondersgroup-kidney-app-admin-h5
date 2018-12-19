import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TabModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { DoctorService, DoctorFormService, DoctorTableService ,IntegralDetailTableService} from './_service';


import { AuthService } from '../../../services';

import { DoctorComponent } from './doctor.component';
import { DoctorEditComponent } from './doctor-edit';
import { MessageSendComponent } from './message-send';
import { IntegralDetailComponent } from './integral-detail';
 
const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: DoctorComponent
}];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TabModule,
    DynamicTableModule,
    DynamicFormModule,
    EditModule,
    ModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorComponent,
    DoctorEditComponent,
    MessageSendComponent,
    IntegralDetailComponent
  ],
  providers: [
    DoctorService,
    DoctorFormService,
    DoctorTableService,
    IntegralDetailTableService
  ]
})
export class DoctorModule {}
