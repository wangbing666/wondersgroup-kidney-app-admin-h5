import { Routes } from '@angular/router';

export const routes: Routes = [
  {
     path: '',
     redirectTo: '/doctor',
     pathMatch: 'full'
  },
  {
    path: 'doctor',
    loadChildren: 'app/container/group-doctor/doctor/doctor.module#DoctorModule'
  },
  {
    path: 'doctor-account',
    loadChildren: 'app/container/group-doctor/doctor-account/doctor-account.module#DoctorAccountModule'
  },
  {
    path: 'doctor-service',
    loadChildren: 'app/container/group-doctor/doctor-service/doctor-service.module#DoctorServiceModule'
  }
];