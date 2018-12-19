import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'activeness-statistics',
    loadChildren: 'app/container/group-statistics/activeness-statistics/activeness-statistics.module#ActivenessStatisticsModule'
  },
  {
    path: 'register-statistics',
    loadChildren: 'app/container/group-statistics/register-statistics/register-statistics.module#RegisterStatisticsModule'
  },
  {
    path: 'period-statistics',
    loadChildren: 'app/container/group-statistics/period-statistics/period-statistics.module#PeriodStatisticsModule'
  },
  {
    path: 'business-statistics',
    loadChildren: 'app/container/group-statistics/business-statistics/business-statistics.module#BusinessStatisticsModule'
  },
  {
    path: 'service-statistics',
    loadChildren: 'app/container/group-statistics/service-statistics/service-statistics.module#ServiceStatisticsModule'
  }
];