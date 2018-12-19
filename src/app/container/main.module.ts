import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { NavigationComponent } from './navigation';

import { AuthService, CommonService, ApiService, SidebarService } from '../services';

import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    NavigationComponent,
  ],
  providers: [
    SidebarService,
    AuthService,
    { provide: 'admin', useExisting: CommonService }
  ],
  exports: []
})
export class MainModule {}
