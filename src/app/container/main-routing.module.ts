import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

import { routes as basicDataRoutes } from './group-basic-data';
import { routes as doctorRoutes} from './group-doctor';
import { routes as feedbackRoutes} from './group-feedback';
import { routes as healthNewsRoutes} from './group-health-news';
import { routes as serviceRoutes} from './group-service';
import { routes as userRoutes} from './group-user';
import { routes as dataCollectionRoutes} from './group-data-collection';
import { routes as adRoutes} from './group-ad';
import { routes as operationPushRoutes } from './group-operation-push';
import { routes as integralRoutes} from './group-integral';
import { routes as statisticsRoutes} from './group-statistics';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: MainComponent,
      children: [
        ...basicDataRoutes,
        ...doctorRoutes,
        ...feedbackRoutes,
        ...healthNewsRoutes,
        ...serviceRoutes,
        ...userRoutes,
        ...dataCollectionRoutes,
        ...adRoutes,
        ...operationPushRoutes,
        ...integralRoutes,
        ...statisticsRoutes,
      ]
    }]
)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
