import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TableOption } from '../../../entities';

import { DoctorAccountService, DoctorAccountTableService } from './_service';
import { SidebarService } from '../../../services';

@Component({
  selector: 'app-doctor-account',
  templateUrl: './doctor-account.component.html'
})
export class DoctorAccountComponent implements OnInit {
  title = '医生账户管理';
  subTitle = '医生账户列表';

  doctorAccountTable: TableOption = new TableOption();
  withdrawDepositTable: TableOption = new TableOption();

  count: number;

  incomeData: any;
  enableIncome: boolean;

  withdrawData: any;
  enableWithdraw: boolean;

  refundData: any;
  enableRefund: boolean;

  message: string;
  enableShow: boolean;

  constructor(
    private _doctorAccountService: DoctorAccountService,
    private _doctorAccountTableService: DoctorAccountTableService,
    private _sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.getDoctorAccountTitles();
    this.getWithdrawDepositTitles();
    this.getUntreatedCount();
    this.getDoctorAccounts(0);
    this.getWithdrawDeposits(0);
  }

  refresh() {
    this.getDoctorAccounts(0);
    this.getWithdrawDeposits(0);
    this.getUntreatedCount();
  }

  getDoctorAccountTitles() {
    this.doctorAccountTable.titles = this._doctorAccountTableService.setDoctorAccountTitles();
  }

  getWithdrawDepositTitles() {
    this.withdrawDepositTable.titles = this._doctorAccountTableService.setWithdrawDepositTitles();
  }

  getDoctorAccounts(page: number) {
    this.doctorAccountTable.currentPage = page;
    this._doctorAccountService.getDoctorAccounts(page, this.doctorAccountTable.size)
      .catch(
        err => {
          this.doctorAccountTable.lists = null;
          this.doctorAccountTable.errorMessage = "啊哦！接口访问出错啦～";
          return Observable.throw(err);
        })
      .subscribe(
        data => {
          if (data.data.content.length === 0 && data.code === 0) {
            this.doctorAccountTable.errorMessage = "该数据为空哦～";
          } else if (data.code === 0) {
            this.doctorAccountTable.totalPage = data.data.totalPages;
            this.doctorAccountTable.lists = data.data.content;
          }
        })
  }

  getWithdrawDeposits(page: number) {
    this.withdrawDepositTable.currentPage = page;
    this._doctorAccountService.getWithdrawDeposits(page, this.withdrawDepositTable.size)
      .catch(
        err => {
          this.withdrawDepositTable.lists = null;
          this.withdrawDepositTable.errorMessage = "啊哦！接口访问出错啦～";
          return Observable.throw(err);
        })
      .subscribe(
        data => {
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.withdrawDepositTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.withdrawDepositTable.totalPage = data.data.totalPages;
            this.withdrawDepositTable.lists = data.data.content;
          } else {
            this.withdrawDepositTable.lists = null;
            if (data.msg) {
              this.withdrawDepositTable.errorMessage = data.msg;
            } else {
              this.withdrawDepositTable.errorMessage = "空空如也～";
            }
          }
        })
  }

  getUntreatedCount() {
    this._doctorAccountService.untreatedCount()
      .catch(
        err => {
          this.count = 0;
          return Observable.throw(err);
        })
      .subscribe(
        data => {
          if (data.code === 0) {
            this.count = data.data;
            this._sidebarService.setCount(this.count, 'doctorgroup', 'doctoraccount');
          } else {
            this.count = 0;
          }
        })
  }

  gotoHandle(data) {
    if (data.key === 'income') {
      this.incomeData = data.value;
      this.enableIncome = true;
    } else if (data.key === 'withdraw') {
      this.withdrawData = data.value;
      this.enableWithdraw = true;
    } else if (data.key === 'pay') {
      this.refundData = data.value;
      this.enableRefund = true;
    }
  }

  refund(target) {
    if (this.refundData && this.refundData.statusId !== 0) {
      this.message = "该项目已处理～";
      this.enableRefund = false;
      this.enableShow = true;
    } else if (this.refundData) {
      this._doctorAccountService.refundOperation(this.refundData.id, target)
        .catch(
          err => {
            this.message = "连接服务器出错";
            this.enableRefund = false;
            this.enableShow = true;
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            if (data.code === 0) {
              this.message = "操作成功～";
              this.enableRefund = false;
              this.enableShow = true;
              this.refresh();
            } else {
              if (data.msg) {
                this.message = data.msg;
              } else {
                this.message = "操作失败～";
              }
              this.enableRefund = false;
              this.enableShow = true;
            }
          })
    }
  }

  refundCancel() {
    this.refundData = null;
    this.enableRefund = false;
  }

}
