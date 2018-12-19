import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'data-collection',
    loadChildren: 'app/container/group-data-collection/data-collection.module#DataCollectionModule'
  }
];