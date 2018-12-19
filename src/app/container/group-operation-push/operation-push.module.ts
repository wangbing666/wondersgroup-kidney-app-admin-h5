import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule}  from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { OperationPushComponent } from './operation-push.component';

import { OperationPushEditComponent } from './operation-push-edit';

import { OperationPushService, OperationPushTableService} from './_service';

import { DynamicTableModule, TabModule ,DynamicFormModule, EditModule, ModalModule} from '../../shared';

import { AuthService } from '../../services';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: OperationPushComponent
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
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OperationPushComponent,
    OperationPushEditComponent
  ],
  providers: [
    OperationPushService,
    OperationPushTableService
  ]
})
export class OperationPushModule {}