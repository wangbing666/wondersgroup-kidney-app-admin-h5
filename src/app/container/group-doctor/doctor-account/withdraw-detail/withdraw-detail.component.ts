import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableOption } from '../../../../entities';

import { DoctorAccountService, DoctorAccountTableService } from '../_service';

@Component({
  selector: 'withdraw-detail',
  template: `
    <modal-full [modalTitle]="modalTitle" (closeEmmit)="close()">
      <div *ngIf="loading">Loading...</div>
      <div *ngIf="withdrawDetailTable.lists">
        <dynamic-table [titles]="withdrawDetailTable.titles" [lists]="withdrawDetailTable.lists" (handleEmmit)="gotoHandle($event)"></dynamic-table>
        <div class="table-nav" style="text-align: right">
          <page-menu [totalPages]="withdrawDetailTable.totalPage" [currentPage]="withdrawDetailTable.currentPage" (pageEmitter)="getWithdrawDetail($event)"></page-menu>
        </div>
      </div>
      <div *ngIf="!withdrawDetailTable.lists" class="error-message">
        <p>{{withdrawDetailTable.errorMessage}}</p>
        <button *ngIf="withdrawDetailTable.errorMessage" class="ui button small" (click)="refresh()">点击刷新</button>
      </div>
    </modal-full>
  `
})
export class WithdrawDetailComponent implements OnInit {
  modalTitle: string;
  withdrawDetailTable: TableOption = new TableOption();
  loading: boolean = true;

  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();

  constructor(
    private _doctorAccountService: DoctorAccountService,
    private _doctorAccountTableService: DoctorAccountTableService
  ) {}

  ngOnInit() {
    this.modalTitle = `${this.data.name} 提现明细`;
    this.getWithdrawDetailTitles();
    if (this.data) {
      this.getWithdrawDetail(0);
    } else {
      this.withdrawDetailTable.errorMessage = "空空如也～";
    }
  }
  refresh() {
    if (this.data) {
      this.getWithdrawDetail(0);
    } else {
      this.withdrawDetailTable.errorMessage = "空空如也～";
    }
  }

  getWithdrawDetailTitles() {
    this.withdrawDetailTable.titles = this._doctorAccountTableService.setWithdrawDetailTitles();
  }

  getWithdrawDetail(page: number) {
    this.withdrawDetailTable.currentPage = page;
    this._doctorAccountService.getWithdrawDetail(this.data.id, page, 10)
      .subscribe(
        data => {
          this.loading = false;
          if (data.data.content.length === 0 && data.code === 0) {
            this.withdrawDetailTable.errorMessage = "该数据为空哦～";
          } else if (data.code === 0) {
            this.withdrawDetailTable.totalPage = data.data.totalPages;
            this.withdrawDetailTable.lists = data.data.content;
          }
        }, err => {
          this.loading = false;
          this.withdrawDetailTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
