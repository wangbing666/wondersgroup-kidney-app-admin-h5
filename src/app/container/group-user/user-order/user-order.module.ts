import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TabModule, DynamicTableModule, ModalModule } from '../../../shared';

import { UserOrderService, UserOrderTableService } from './_service';

import { AuthService } from '../../../services';

import { UserOrderComponent } from './user-order.component';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: UserOrderComponent
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
    UserOrderComponent
  ],
  providers: [
    UserOrderService,
    UserOrderTableService
  ]
})
export class UserOrderModule {}
