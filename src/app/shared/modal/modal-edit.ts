import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-edit',
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
        <ng-content></ng-content>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['modal.css']
})
export class ModalEdit implements OnInit {
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
