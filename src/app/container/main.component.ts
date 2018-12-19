import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <app-nav>
      <router-outlet></router-outlet>
    </app-nav>
  `
})
export class MainComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

}
