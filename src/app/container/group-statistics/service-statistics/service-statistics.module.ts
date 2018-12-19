import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ServiceStatisticsComponent } from './service-statistics.component';

import {
  ServiceStatisticsService,
  ServiceStatisticsTableService
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
  component: ServiceStatisticsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DynamicTableModule,
    ModalModule,
    TabModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ServiceStatisticsComponent
  ],
  providers: [
    ServiceStatisticsService,
    ServiceStatisticsTableService
  ]
})
export class ServiceStatisticsModule {}
