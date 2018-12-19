import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'operation-push',
    loadChildren: 'app/container/group-operation-push/operation-push.module#OperationPushModule'
  }
];
