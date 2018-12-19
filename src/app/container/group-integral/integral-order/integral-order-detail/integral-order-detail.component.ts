import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableOption } from '../../../../entities';

import { IntegralOrderTableService } from '../_service';

@Component({
  selector: 'integral-order-detail',
  template: `
    <modal-full [modalTitle]="modalTitle" (closeEmmit)="close()">
      <div *ngIf="!integralOrderDetailTable.lists&&integralOrderDetailTable.loading">Loading...</div>
      <div *ngIf="integralOrderDetailTable.lists">
        <dynamic-table [titles]="integralOrderDetailTable.titles" [lists]="integralOrderDetailTable.lists"></dynamic-table>
      </div>
      <div *ngIf="!integralOrderDetailTable.lists&&!integralOrderDetailTable.loading" class="error-message">
        <p>{{integralOrderDetailTable.errorMessage}}</p>
        <button *ngIf="integralOrderDetailTable.errorMessage" class="ui button small" (click)="refresh()">点击刷新</button>
      </div>
    </modal-full>
  `
})
export class IntegralOrderDetailComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  integralOrderDetailTable: TableOption = new TableOption();;

  constructor(
    private _integralOrderTableService: IntegralOrderTableService
  ) {}

  ngOnInit() {
    this.modalTitle = `兑换商品明细`;
    this.getIncomeDetailTitles();
    if (this.data) {
      this.getIncomeDetail();
    } else {
      this.integralOrderDetailTable.errorMessage = "空空如也～";
    }
  }

  refresh() {
    if (this.data) {
      this.integralOrderDetailTable.loading = true;
      this.getIncomeDetail();
    } else {
      this.integralOrderDetailTable.errorMessage = "空空如也～";
    }
  }

  getIncomeDetailTitles() {
    this.integralOrderDetailTable.titles = this._integralOrderTableService.setDetailTitles();
  }

  getIncomeDetail() {
    // console.log(this.data);
    this.integralOrderDetailTable.lists = this.data;
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
