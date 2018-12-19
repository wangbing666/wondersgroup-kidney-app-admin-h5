import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'feedback',
    loadChildren: 'app/container/group-feedback/feedback.module#FeedbackModule'
  }
];