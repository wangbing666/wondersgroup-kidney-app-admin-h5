import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TabModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { BasicServiceService, BasicServiceTableService, BasicServiceFormService } from './_service';

import { AuthService } from '../../../services';

import { BasicServiceComponent } from './basic-service.component';
import { BasicServiceEditComponent } from './basic-service-edit';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: BasicServiceComponent
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
    BasicServiceComponent,
    BasicServiceEditComponent
  ],
  providers: [
    BasicServiceService,
    BasicServiceTableService,
    BasicServiceFormService
  ]
})
export class BasicServiceModule {}
