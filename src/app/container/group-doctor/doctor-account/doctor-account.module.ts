import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TabModule, DynamicTableModule, ModalModule } from '../../../shared';

import { DoctorAccountService, DoctorAccountTableService } from './_service';

import { AuthService } from '../../../services';

import { DoctorAccountComponent } from './doctor-account.component';
import { IncomeDetailComponent } from './income-detail';
import { WithdrawDetailComponent } from './withdraw-detail';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: DoctorAccountComponent
}];

@NgModule({
  imports: [
    CommonModule,
    TabModule,
    DynamicTableModule,
    ModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorAccountComponent,
    IncomeDetailComponent,
    WithdrawDetailComponent
  ],
  providers: [
    DoctorAccountService,
    DoctorAccountTableService
  ]
})
export class DoctorAccountModule {}
