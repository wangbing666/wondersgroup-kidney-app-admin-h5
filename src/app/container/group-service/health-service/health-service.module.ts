import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TabSingleModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { HealthServiceService, HealthServiceTableService ,HealthServiceFormService} from './_service';

import { AuthService } from '../../../services';

import { HealthServiceComponent } from './health-service.component';
import { HealthServiceEditComponent } from './health-service-edit';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: HealthServiceComponent
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
    HealthServiceComponent,
    HealthServiceEditComponent
  ],
  providers: [
   HealthServiceService,
   HealthServiceTableService,
   HealthServiceFormService
  ]
})
export class HealthServiceModule {}