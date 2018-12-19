import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-show',
  template: `
  <div class="ui dimmer modals page transition visible active modal-show">
    <div class="ui modal transition visible active">
      <div class="header">
        {{title}}
      </div>
      <div class="content">
        <p>{{message}}</p>
      </div>
      <div class="actions">
        <div class="ui teal right button" (click)="close()">
          确定
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['modal.css']
})
export class ModalShow implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }
}
