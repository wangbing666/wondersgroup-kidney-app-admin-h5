import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'modal-img',
  template: `
  <div id="modal-img" class="ui dimmer modals page transition visible active">
    <div style="position: relative;width: 100%;height: 100%;margin: 10% 0">
      <img *ngFor="let imgUrl of imgUrls" class="ui fluid image" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;width: 30%" [src]="imgUrl">
      <i class="inverted close icon" (click)="close()" style="position: fixed;top: 50px;right: 50px;cursor: pointer;z-index:999999"></i>
    </div>
  </div>
  `,
  styleUrls: ['modal.css']
})
export class ModalImg implements OnInit, AfterViewInit {
  @Input() imgUrls: Array < any > ;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    $('#modal-img').perfectScrollbar();
    $('#modal-img').perfectScrollbar('update');
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }
}
