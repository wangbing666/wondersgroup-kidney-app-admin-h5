import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-full',
  template: `
  <div class="modal-full">
    <i class="close icon" (click)="close()"></i>
    <div class="modal-header">
      {{modalTitle}}
    </div>
    <div class="modal-container">
      <ng-content></ng-content>
    </div>
  </div>
  `,
  styleUrls: ['modal.css']
})
export class ModalFull implements OnInit {
  @Input() modalTitle: string;
  @Output() closeEmmit: EventEmitter < any > = new EventEmitter();
  constructor() {}

  ngOnInit() {
    document.body.scrollTop = 0;
  }

  close() {
    this.closeEmmit.emit();
  }
}
