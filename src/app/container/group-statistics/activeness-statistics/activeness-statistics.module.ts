import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ActivenessStatisticsComponent } from './activeness-statistics.component';

import {
  ActivenessStatisticsService,
  ActivenessStatisticsTableService
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
  component: ActivenessStatisticsComponent
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
    ActivenessStatisticsComponent
  ],
  providers: [
    ActivenessStatisticsService,
    ActivenessStatisticsTableService
  ]
})
export class ActivenessStatisticsModule {}
