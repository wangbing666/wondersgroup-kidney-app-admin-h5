import { Routes } from '@angular/router';
import { AdDoctorComponent } from './ad-doctor.component';
// import { AuthService } from '../../services';

export const AdDoctorRoutes: Routes = [{
  path: 'ad-doctor',
  // canActivate: [AuthService],
  component: AdDoctorComponent
}];
