import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'health-news',
    loadChildren: 'app/container/group-health-news/health-news.module#HealthNewsModule'
  }
];