import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'department',
    loadChildren: 'app/container/group-basic-data/department/department.module#DepartmentModule'
  },
  {
    path: 'discomfort-symptom',
    loadChildren: 'app/container/group-basic-data/discomfort-symptom/discomfort-symptom.module#DiscomfortSymptomModule'
  },
  {
    path: 'doctor-title',
    loadChildren: 'app/container/group-basic-data/doctor-title/doctor-title.module#DoctorTitleModule'
  },
  {
    path: 'drug',
    loadChildren: 'app/container/group-basic-data/drug/drug.module#DrugModule'
  },
  {
    path: 'health-organization',
    loadChildren: 'app/container/group-basic-data/health-organization/health-organization.module#HealthOrganizationModule'
  },
  {
    path: 'hospital',
    loadChildren: 'app/container/group-basic-data/hospital/hospital.module#HospitalModule'
  },
  {
    path: 'news-classify',
    loadChildren: 'app/container/group-basic-data/news-classify/news-classify.module#NewsClassifyModule'
  },
  {
    path: 'inspection-category',
    loadChildren: 'app/container/group-basic-data/inspection-category/inspection-category.module#InspectionCategoryModule'
  },
  {
    path: 'inspection-item',
    loadChildren: 'app/container/group-basic-data/inspection-item/inspection-item.module#InspectionItemModule'
  },
  {
    path: 'push-time',
    loadChildren: 'app/container/group-basic-data/push-time/push-time.module#PushTimeModule'
  }
];