import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'basic-service',
    loadChildren: 'app/container/group-service/basic-service/basic-service.module#BasicServiceModule'
  },
  {
    path: 'health-service',
    loadChildren: 'app/container/group-service/health-service/health-service.module#HealthServiceModule'
  }
];