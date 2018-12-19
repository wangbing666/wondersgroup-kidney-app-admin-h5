import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { UserOrderService, UserOrderTableService } from './_service';
import { SidebarService } from '../../../services';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html'
})
export class UserOrderComponent implements OnInit {
  title = '用户订单管理';
  subTitle = '用户订单列表';

  userOrderTable: TableOption = new TableOption({ size: 20 });
  refundOrderTable: TableOption = new TableOption();
  untreatedOrderTable: TableOption = new TableOption();

  refundCount: number;
  untreatedCount: number;

  enableProcess: boolean;
  processMessage: string;
  processData: any;

  message: string;
  enableShow: boolean;

  constructor(
    private _userOrderService: UserOrderService,
    private _userOrderTableService: UserOrderTableService,
    private _sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.getUserOrderTitles();
    this.getRefundOrderTitles();
    this.getUntreatedOrderTitles();
    this.getUserOrders(0);
    this.getRefundOrders();
    this.getUntreatedOrders();
  }

  refresh() {
    this.getUserOrders(0);
    this.getRefundOrders();
    this.getUntreatedOrders();
    this._sidebarService.getUserOrderCount()
      .subscribe(data => {
        if (data.data && data.code === 0) {
          this._sidebarService.setCount(data.data, 'usergroup', 'userorder');
        }
      })
  }

  getUserOrderTitles() {
    this.userOrderTable.titles = this._userOrderTableService.setUserOrderTitles();
  }

  getRefundOrderTitles() {
    this.refundOrderTable.titles = this._userOrderTableService.setRefundOrderTitles();
  }

  getUntreatedOrderTitles() {
    this.untreatedOrderTable.titles = this._userOrderTableService.setUntreatedOrderTitles();
  }

  getUserOrders(page: number) {
    this.userOrderTable.currentPage = page;
    this._userOrderService.getUserOrders(page, this.userOrderTable.size)
      .subscribe(
        data => {
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderTable.errorMessage = "该数据为空哦～";
          } else if (data.code === 0) {
            this.userOrderTable.totalPage = data.data.totalPages;
            this.userOrderTable.lists = data.data.content;
          }
        }, err => {
          this.userOrderTable.lists = null;
          this.userOrderTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getRefundOrders() {
    this._userOrderService.getRefundOrders()
      .subscribe(
        data => {
          if (data.data && data.data.length === 0 && data.code === 0) {
            this.refundOrderTable.errorMessage = "该数据为空哦～";
            this.refundCount = data.data.length;
          } else if (data.data && data.code === 0) {
            this.refundOrderTable.lists = data.data;
            this.refundCount = data.data.length;
          } else {
            this.refundOrderTable.lists = null;
            if (data.msg) {
              this.refundOrderTable.errorMessage = data.msg;
            } else {
              this.refundOrderTable.errorMessage = "空空如也～";
            }
          }
        }, err => {
          this.refundOrderTable.lists = null;
          this.refundOrderTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getUntreatedOrders() {
    this._userOrderService.getUntreatedOrders()
      .subscribe(
        data => {
          if (data.data && data.data.length === 0 && data.code === 0) {
            this.untreatedOrderTable.errorMessage = "该数据为空哦～";
            this.untreatedCount = data.data.length;
          } else if (data.data && data.code === 0) {
            this.untreatedOrderTable.lists = data.data;
            this.untreatedCount = data.data.length;
          } else {
            this.untreatedOrderTable.lists = null;
            if (data.msg) {
              this.untreatedOrderTable.errorMessage = data.msg;
            } else {
              this.untreatedOrderTable.errorMessage = "空空如也～";
            }
          }
        }, err => {
          this.untreatedOrderTable.lists = null;
          this.untreatedOrderTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  gotoHandle(data) {
    if (data.key === 'refund') {
      this.processData = data;
      this.processMessage = "确定已退款？";
      this.enableProcess = true;
    } else if (data.key === 'thirdProcess') {
      this.processData = data;
      this.processMessage = "确定已处理？";
      this.enableProcess = true;
    }
  }

  process() {
    if (this.processData.key === 'refund') {
      this._userOrderService.userOrderRefund(this.processData.value.id)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.message = "操作成功～";
              this.enableProcess = false;
              this.enableShow = true;
              this.refresh();
            } else {
              if (data.msg) {
                this.message = data.msg;
              } else {
                this.message = "操作失败～";
              }
              this.enableProcess = false;
              this.enableShow = true;
            }
          }, err => {
            this.message = "连接服务器出错";
            this.enableProcess = false;
            this.enableShow = true;
          })
    } else if (this.processData.key === 'thirdProcess') {
      this._userOrderService.userOrderTreat(this.processData.value.id)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.message = "操作成功～";
              this.enableProcess = false;
              this.enableShow = true;
              this.refresh();
            } else {
              if (data.msg) {
                this.message = data.msg;
              } else {
                this.message = "操作失败～";
              }
              this.enableProcess = false;
              this.enableShow = true;
            }
          }, err => {
            this.message = "连接服务器出错";
            this.enableProcess = false;
            this.enableShow = true;
          })
    }
  }

  processCancel() {
    this.processData = null;
    this.processMessage = '';
    this.enableProcess = false;
  }

}
