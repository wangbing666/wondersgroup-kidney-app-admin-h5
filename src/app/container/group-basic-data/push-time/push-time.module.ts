import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }  from '@angular/forms';

import { PushTimeComponent } from './push-time.component';

import { PushTimeEditComponent } from './push-time-edit';

import { PushTimeService, PushTimeTableService } from './_service';

import { AuthService } from '../../../services';

import { DynamicTableModule, TabModule ,DynamicFormModule, EditModule, ModalModule} from '../../../shared';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: PushTimeComponent
}];

@NgModule({
  imports: [
    CommonModule,
    TabModule,
    FormsModule,
    DynamicTableModule,
    DynamicFormModule, 
    EditModule, 
    ModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PushTimeComponent,
    PushTimeEditComponent
  ],
  providers: [
    PushTimeService,
    PushTimeTableService
  ]
})
export class PushTimeModule {}