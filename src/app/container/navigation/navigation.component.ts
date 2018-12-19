import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Sidebar } from '../../entities';
import { AuthService, SidebarService } from '../../services';

declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  sidebarActive: boolean = true;

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initSidebars();
  }

  ngAfterViewInit() {
    $('#sidebar').perfectScrollbar();
    $('#sidebar').perfectScrollbar('update');
  }

  initSidebars() {
    let path = window.location.hash.split('#')[1];
    this.sidebarService.initSidebars(path);
    this.setCount();
  }

  setCount() {
    this.sidebarService.getDoctorCount()
      .subscribe(data => {
        if (data.data && data.code === 0) {
          this.sidebarService.setCount(data.data, 'doctorgroup', 'doctor');
        }
      })
    this.sidebarService.getDoctorAccountCount()
      .subscribe(data => {
        if (data.data && data.code === 0) {
          this.sidebarService.setCount(data.data, 'doctorgroup', 'doctoraccount');
        }
      })
    this.sidebarService.getDoctorGroupCount()
      .subscribe(data => {
        if (data.data && data.code === 0) {
          this.sidebarService.setCount(data.data, 'doctorgroup', 'doctorservice');
        }
      })
    this.sidebarService.getUserOrderCount()
      .subscribe(data => {
        if (data.data && data.code === 0) {
          this.sidebarService.setCount(data.data, 'usergroup', 'userorder');
        }
      })
    this.sidebarService.getIntegralOrderCount()
      .subscribe(data => {
        if (data.data && data.code === 0) {
          this.sidebarService.setCount(data.data, 'integral', 'integralorder');
        }
      })
  }

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  toggleSub(sidebar) {
    sidebar.open = !sidebar.open;
  }

  setActive(sidebar) {
    this.sidebarService.resetActive();
    sidebar.active = true;
    this.router.navigate([sidebar.link]);
  }

  logout() {
    this.authService.signout();
  }

}
