import { NgModule } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TabModule, ModalModule, DynamicTableModule } from '../../shared';

import { 
  DataCollectionService, 
  DataCollectionTableService, 
  DataCollectionDetailService
} from './_service';
import { InspectionCategoryService } from '../group-basic-data/inspection-category/_service';
import { InspectionItemService } from '../group-basic-data/inspection-item/_service';
import { DrugService } from '../group-basic-data/drug/_service';

import { MainComponent } from '../main.component';
import { DataCollectionComponent } from './data-collection.component';
import { 
  DataCollectionDetailComponent,
  BriefDetailComponent,
  MedicalDetailComponent,
  OtherDetailComponent,
  RecordDetailComponent,
  ReportDetailComponent
} from './data-collection-detail';
import { 
  DataCollectionEditComponent,
  EditFormComponent,
  ImageFormComponent,
  InspectionFormComponent,
  InspectionItemFormComponent,
  MedicineFormComponent
} from './data-collection-edit';
import { UserInfoComponent } from './userInfo';
import { ImageShowComponent } from './imageShow';
import { 
  HandleAuditingComponent,
  HandlePassComponent, 
  HandleUnhandleComponent, 
  HandleUnpassComponent 
} from './handle';

const routes: Routes = [
  // {
  //   path: '',
  //   component: MainComponent,
  //   children: [
      {
        path: '',
        component: DataCollectionComponent,
      }, {
        path: 'detail/:id',
        component: DataCollectionDetailComponent
      }, {
        path: 'edit/:id',
        component: DataCollectionEditComponent
      }
  //   ]
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TabModule, ModalModule,
    DynamicTableModule
  ],
  declarations: [
    DataCollectionComponent,
    UserInfoComponent,
    ImageShowComponent,
    DataCollectionDetailComponent,
    BriefDetailComponent,
    MedicalDetailComponent,
    OtherDetailComponent,
    RecordDetailComponent,
    ReportDetailComponent,
    DataCollectionEditComponent,
    EditFormComponent,
    ImageFormComponent,
    InspectionFormComponent,
    InspectionItemFormComponent,
    MedicineFormComponent,
    HandleAuditingComponent,
    HandlePassComponent, 
    HandleUnhandleComponent, 
    HandleUnpassComponent 
  ],
  providers: [
    DataCollectionService, 
    DataCollectionTableService,
    DataCollectionDetailService,
    InspectionCategoryService,
    InspectionItemService,
    DrugService
  ]
})
export class DataCollectionModule {
  
}