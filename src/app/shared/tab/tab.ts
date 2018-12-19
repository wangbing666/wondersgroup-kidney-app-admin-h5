import {
  Component,
  Input,
  AfterContentInit,
  QueryList,
  ContentChildren,
  ViewEncapsulation
} from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tab',
  template: `
    <div class="ui tab segment tab-content" [class.active]="active">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {
  @Input('title') title: string;
  @Input('label') label: string;
  @Input('color') color: string;
  active: boolean = false;
}

@Component({
  selector: 'tab-set',
  template: `
    <div class="ui menu" [ngClass]="menuClass">
      <a class="item" [class.active]="tab.active" *ngFor="let tab of tabs" (click)="setActive(tab)">
        {{tab.title}}
        <div class="floating ui mini circular label" *ngIf="tab.label" style="left: initial;right: 0;background-color: #e74c3c">{{tab.label}}</div>
      </a>
    </div>
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None
})
export class TabSet implements AfterContentInit {
  @Input() menuClass: string;
  @ContentChildren(Tab) tabs: QueryList < Tab > ;

  constructor() {}

  ngAfterContentInit() {
    this.tabs.toArray()[0].active = true;
  }

  setActive(tab: Tab) {
    this.tabs.toArray().forEach((t) => t.active = false);
    tab.active = true;
  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Tab, TabSet
  ],
  exports: [
    Tab, TabSet
  ]
})
export class TabModule {}
