import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TabModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../shared';

import { FeedbackService, FeedbackTableService } from './_service';

import { AuthService } from '../../services';

import { FeedbackComponent } from './feedback.component';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: FeedbackComponent
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
    FeedbackComponent
  ],
  providers: [
    FeedbackService,
    FeedbackTableService
  ]
})
export class FeedbackModule {}
