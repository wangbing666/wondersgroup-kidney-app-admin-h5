import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableOption } from '../../../../entities';

import { DoctorAccountService, DoctorAccountTableService } from '../_service';

@Component({
  selector: 'income-detail',
  template: `
    <modal-full [modalTitle]="modalTitle" (closeEmmit)="close()">
      <div *ngIf="!incomeDetailTable.lists&&incomeDetailTable.loading">Loading...</div>
      <div *ngIf="incomeDetailTable.lists">
        <dynamic-table [titles]="incomeDetailTable.titles" [lists]="incomeDetailTable.lists" (handleEmmit)="gotoHandle($event)"></dynamic-table>
        <div class="table-nav" style="text-align: right">
          <page-menu [totalPages]="incomeDetailTable.totalPage" [currentPage]="incomeDetailTable.currentPage" (pageEmitter)="getIncomeDetail($event)"></page-menu>
        </div>
      </div>
      <div *ngIf="!incomeDetailTable.lists&&!incomeDetailTable.loading" class="error-message">
        <p>{{incomeDetailTable.errorMessage}}</p>
        <button *ngIf="incomeDetailTable.errorMessage" class="ui button small" (click)="refresh()">点击刷新</button>
      </div>
    </modal-full>
  `
})
export class IncomeDetailComponent implements OnInit {
  modalTitle: string;
  incomeDetailTable: TableOption = new TableOption();

  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();

  constructor(
    private _doctorAccountService: DoctorAccountService,
    private _doctorAccountTableService: DoctorAccountTableService
  ) {}

  ngOnInit() {
    this.modalTitle = `${this.data.name} 收入明细`;
    this.getIncomeDetailTitles();
    if (this.data) {
      this.getIncomeDetail(0);
    } else {
      this.incomeDetailTable.errorMessage = "空空如也～";
    }
  }

  refresh() {
    if (this.data) {
      this.incomeDetailTable.loading = true;
      this.getIncomeDetail(0);
    } else {
      this.incomeDetailTable.errorMessage = "空空如也～";
    }
  }

  getIncomeDetailTitles() {
    this.incomeDetailTable.titles = this._doctorAccountTableService.setIncomeDetailTitles();
  }

  getIncomeDetail(page: number) {
    this.incomeDetailTable.currentPage = page;
    this._doctorAccountService.getIncomeDetail(this.data.id, page, 10)
      .subscribe(
        data => {
          this.incomeDetailTable.loading = false;
          if (data.data.content.length === 0 && data.code === 0) {
            this.incomeDetailTable.errorMessage = "该数据为空哦～";
          } else if (data.code === 0) {
            this.incomeDetailTable.totalPage = data.data.totalPages;
            this.incomeDetailTable.lists = data.data.content;
          }
        }, err => {
          this.incomeDetailTable.loading = false;
          this.incomeDetailTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
