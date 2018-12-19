import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'integral-detail',
    loadChildren: 'app/container/group-integral/integral-detail/integral-detail.module#IntegralDetailModule'
  },
    {
    path: 'integral-order',
    loadChildren: 'app/container/group-integral/integral-order/integral-order.module#IntegralOrderModule'
  },
    {
    path: 'integral-commodity',
    loadChildren: 'app/container/group-integral/integral-commodity/integral-commodity.module#IntegralCommodityModule'
  }
];