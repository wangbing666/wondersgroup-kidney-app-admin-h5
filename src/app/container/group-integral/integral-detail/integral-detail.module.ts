import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IntegralDetailComponent } from './integral-detail.component';

import { TabModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { IntegralDetailService,  IntegralDetailTableService } from './_service';

import { AuthService } from '../../../services';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: IntegralDetailComponent
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
    IntegralDetailComponent
  ],
  providers: [
    IntegralDetailService,
    IntegralDetailTableService
  ]
})
export class IntegralDetailModule {}