import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ApiService, CommonService, SidebarService } from './services';
import { api } from '../environments/environment';

import { LoginModule } from './container/app-login';
import { MainModule } from './container/main.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MainModule,
    LoginModule,
    AppRoutingModule
  ],
  providers: [
    ApiService,
    CommonService,
    SidebarService,
    { provide: 'api', useValue: api }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
