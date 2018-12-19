import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IntegralCommodityComponent } from './integral-commodity.component';
import { IntegralCommodityEditComponent } from './integral-commodity-edit';

import { TabSingleModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { IntegralCommodityService, IntegralCommodityFormService,  IntegralCommodityTableService } from './_service';

import { AuthService } from '../../../services';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: IntegralCommodityComponent
}];

@NgModule({
  imports: [
    CommonModule,
    TabSingleModule,
    DynamicTableModule,
    DynamicFormModule,
    EditModule,
    ModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    IntegralCommodityComponent,
    IntegralCommodityEditComponent
  ],
  providers: [
    IntegralCommodityService,
    IntegralCommodityFormService,
    IntegralCommodityTableService
  ]
})
export class IntegralCommodityModule {}