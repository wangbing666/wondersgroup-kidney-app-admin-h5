import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { TabModule, DynamicTableModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';

import { DiscomfortService, DiscomfortFormService, DiscomfortTableService } from './_service';

import { AuthService } from '../../../services';

import { DiscomfortComponent } from './discomfort-symptom.component';
import { DiscomfortEditComponent } from './discomfort-symptom-edit';

// import { DiscomfortSymptomRoutes } from './discomfort-symptom.routes';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: DiscomfortComponent
}];

@NgModule({
  imports: [
    CommonModule,
    TabModule,
    DynamicTableModule,
    DynamicFormModule,
    EditModule,
    ModalModule,
    // DiscomfortSymptomRoutes,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DiscomfortComponent,
    DiscomfortEditComponent
  ],
  providers: [
    DiscomfortService,
    DiscomfortFormService,
    DiscomfortTableService
  ]
})
export class DiscomfortSymptomModule {}
