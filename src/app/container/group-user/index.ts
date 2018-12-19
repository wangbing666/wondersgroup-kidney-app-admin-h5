import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user',
    loadChildren: 'app/container/group-user/user/user.module#UserModule'
  },
  {
    path: 'user-order',
    loadChildren: 'app/container/group-user/user-order/user-order.module#UserOrderModule'
  }
];