import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegisterStatisticsComponent } from './register-statistics.component';

import {
  RegisterStatisticsService,
  RegisterStatisticsTableService
} from './_service';
import { AuthService } from '../../../services';

import {
  DynamicTableModule,
  ModalModule,
  TabModule
} from '../../../shared';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: RegisterStatisticsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    DynamicTableModule,
    ModalModule,
    TabModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegisterStatisticsComponent
  ],
  providers: [
    RegisterStatisticsService,
    RegisterStatisticsTableService
  ]
})
export class RegisterStatisticsModule {}
