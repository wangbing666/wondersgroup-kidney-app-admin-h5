import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-userinfo',
  templateUrl: 'userInfo.component.html',
  styleUrls: ['../data-collection.component.css']
})
export class UserInfoComponent implements OnInit {
  @Input() user;
  
  constructor() {}

  ngOnInit() {
    
  }
}