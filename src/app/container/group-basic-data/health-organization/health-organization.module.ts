import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TabModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { HealthService, HealthFormService, HealthTableService } from './_service';

import { AuthService } from '../../../services';

import { HealthComponent } from './health-organization.component';
import { HealthEditComponent } from './health-organization-edit';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: HealthComponent
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
    HealthComponent,
    HealthEditComponent
  ],
  providers: [
    HealthService,
    HealthFormService,
    HealthTableService
  ]
})
export class HealthOrganizationModule {}
