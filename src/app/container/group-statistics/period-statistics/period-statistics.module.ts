import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { PeriodStatisticsComponent } from './period-statistics.component';

import {
  PeriodStatisticsService,
  PeriodStatisticsTableService
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
  component: PeriodStatisticsComponent
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
    PeriodStatisticsComponent
  ],
  providers: [
    PeriodStatisticsService,
    PeriodStatisticsTableService
  ]
})
export class PeriodStatisticsModule {}