import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      loadChildren: 'app/container/main.module#MainModule',
    }]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
