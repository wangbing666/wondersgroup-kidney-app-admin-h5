import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IntegralOrderComponent } from './integral-order.component';
import { IntegralOrderDetailComponent } from './integral-order-detail';

import { TabModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { IntegralOrderService,  IntegralOrderTableService } from './_service';

import { AuthService } from '../../../services';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: IntegralOrderComponent
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
    IntegralOrderComponent,
    IntegralOrderDetailComponent
  ],
  providers: [
    IntegralOrderService,
    IntegralOrderTableService
  ]
})
export class IntegralOrderModule {}