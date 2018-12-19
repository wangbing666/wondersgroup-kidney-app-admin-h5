import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/ad-doctor',
    pathMatch: 'full'
  },
  {
    path: 'ad-doctor',
    loadChildren: 'app/container/group-ad/ad-doctor/ad-doctor.module#AdDoctorModule'
  }
];