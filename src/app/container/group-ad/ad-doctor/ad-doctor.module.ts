import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AdDoctorComponent } from './ad-doctor.component';

import { AdDoctorEditComponent } from './ad-doctor-edit';

import { AdDoctorService, AdDoctorFormService, AdDoctorTableService } from './_service';

import { DynamicTableModule, TabModule ,DynamicFormModule, EditModule, ModalModule} from '../../../shared';

import { AuthService } from '../../../services';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: AdDoctorComponent
}];

@NgModule({
  imports: [
    CommonModule,
    TabModule,
    FormsModule,
    DynamicTableModule,
    DynamicFormModule, 
    EditModule, 
    ModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AdDoctorComponent,
    AdDoctorEditComponent
  ],
  providers: [
    AdDoctorService,
    AdDoctorFormService,
    AdDoctorTableService
  ]
})
export class AdDoctorModule {}
