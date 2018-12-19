import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { DynamicTableModule, DynamicFormModule, EditModule, ModalModule ,TabModule} from '../../shared';

import { HealthNewsService, HealthNewsFormService, HealthNewsTableService ,ReadCoefficientFormService ,HealthNewsDoctorTableService} from './_service';

import { AuthService } from '../../services';

import { HealthNewsComponent } from './health-news.component';
import { HealthNewsEditComponent } from './health-news-edit';
import { ReadingQuantityComponent } from './reading-quantity';

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: HealthNewsComponent
}];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DynamicTableModule,
    DynamicFormModule,
    EditModule,
    ModalModule,
    TabModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HealthNewsComponent,
    HealthNewsEditComponent,
    ReadingQuantityComponent
  ],
  providers: [
    HealthNewsService,
    HealthNewsFormService,
    HealthNewsTableService,
    ReadCoefficientFormService,
    HealthNewsDoctorTableService
  ]
})
export class HealthNewsModule {}
