import { Component, OnInit, Inject } from '@angular/core';

import { TableOption } from '../../../entities';

import { IntegralOrderService, IntegralOrderTableService } from './_service';

import { SidebarService } from '../../../services';

declare var $: any;

@Component({
  selector: 'integral-order',
  templateUrl: 'integral-order.component.html'
})
export class IntegralOrderComponent implements OnInit {
    title = '积分管理';
    subTitle = '积分商品订单管理';

    IntegralOrderTable: TableOption;
    IntegralOrderedTable: TableOption;

    integralOrderDetail: any;

    integralOrderCount: number;

    integralOrder: any;
    integralOrdered: any;

    enableDetail: boolean;

    enableMessage: boolean;

    titleShow: string = '提示信息';
    message: string;
    enableShow: boolean;

    isSend: boolean = true;

    integralExpressList: any;
    expressName: any;
    express: string = '';

    goodsName: string;
    expressNumber: string = '';
    operator: string;
    msg: string;
    opt: string;
    courierId: number;
    processStatus: number;
    editTitle: string;
    msgTitle: string = "请填写以下信息：";

    constructor(
      @Inject('admin') private admin,
      private _integralOrderService: IntegralOrderService,
      private _integralOrderTableService: IntegralOrderTableService,
      private _sidebarService: SidebarService
  ) {}

     ngOnInit() {  
        this.refresh();  
  }

  refresh() {
    this.IntegralOrderTable = new TableOption();
    this.IntegralOrderedTable = new TableOption();
    this.getIntegralOrderTitles();
    this.getIntegralOrderedTitles();
    this.getIntegralOrders(0);
    this.getIntegralOrdereds(0);
    this.getCount();
  }

  getIntegralOrderTitles() {
    this.IntegralOrderTable.titles = this._integralOrderTableService.setDealTitles();
  }

  getIntegralOrderedTitles() {
    this.IntegralOrderedTable.titles = this._integralOrderTableService.setDealedTitles();
  }

  //时间转换
  getDate(time){
    let d = new Date(Number(time));
    var date = (d.getFullYear()) + "-" + 
               (d.getMonth() + 1) + "-" +
               (d.getDate()) + " " + 
               (d.getHours()) + ":" + 
               (d.getMinutes()) + ":" + 
               (d.getSeconds());
    return date;
  }

  getIntegralOrders(page: number) {
    this.IntegralOrderTable.currentPage = page;
    this._integralOrderService.getIntegralOrder(0, 20, page)
      .subscribe(
        data => {
          this.IntegralOrderTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.IntegralOrderTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.IntegralOrderTable.totalPage = data.data.totalPages;
            this.IntegralOrderTable.lists = data.data.content;
            for (var i = 0; i < this.IntegralOrderTable.lists.length; ++i) {
              this.IntegralOrderTable.lists[i].orderTime = this.getDate(this.IntegralOrderTable.lists[i].orderTime); 
            }
            // console.log(data.data.content);
          } else {
            this.IntegralOrderTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.IntegralOrderTable.loading = false;
          this.IntegralOrderTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getIntegralOrdereds(page: number) {
    this.IntegralOrderedTable.currentPage = page;
    this._integralOrderService.getIntegralOrder(1, 20, page)
      .subscribe(
        data =>{
          this.IntegralOrderedTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.IntegralOrderedTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.IntegralOrderedTable.totalPage = data.data.totalPages;
            this.IntegralOrderedTable.lists = data.data.content;
            for (var i = 0; i < this.IntegralOrderedTable.lists.length; ++i) {
              this.IntegralOrderedTable.lists[i].operateTime = this.getDate(this.IntegralOrderedTable.lists[i].operateTime); 
            }
          } else {
            this.IntegralOrderedTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.IntegralOrderedTable.loading = false;
          this.IntegralOrderedTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getCount() {
    this._integralOrderService.getIntegralOrderCount()
      .subscribe(
        data => {
          if (data.code === 0) {
            this.integralOrderCount = data.data;
            // console.log(data.data);
            this._sidebarService.setCount(this.integralOrderCount, 'integral', 'integralorder');
          }
        })
  }

  gotoHandle(data) {
    if(data.key === 'showGoods'){
        this.enableDetail = true;
        this.integralOrderDetail = data.value.slices;
    }else if (data.key === 'sendMessage') {
        this.enableMessage = true;
        this.isSend = true;
        this.integralOrder = data.value;
        this.editTitle = "发送短信";
        $('#integralExpressList').dropdown();
        this.expressComponyList()
        .subscribe(
        () => {
         
        }, err => {
          this.IntegralOrderTable.errorMessage = "啊哦！接口访问出错啦～";
        })
    } else if (data.key === 'editNumber') {
        this.enableMessage = true;
        this.isSend = false;
        this.integralOrder = data.value;
        this.editTitle = "编辑单号";
        $('#integralExpressList').dropdown();
        this.expressComponyList()
        .subscribe(
        () => {
         
        }, err => {
          this.IntegralOrderedTable.errorMessage = "啊哦！接口访问出错啦～";
        })
      } 
  }

  setMsg(){
      this.msg = "您兑换的商品已发货，快递为" + this.express + "，单号为" + this.expressNumber + "，请注意查收，如有问题，请联系客服400-112-1881";
  }

  expressComponyList(){
      return this._integralOrderService.getExpressList()
      .map(
          data =>{
              if (data.data && data.code == 0 ){
                  this.integralExpressList = data.data;
                  this.expressName = data.data[0];
              }
          })
  }

  expressNoEdit(data) {
    let body: any;
     body = {
      orderId: this.integralOrder.orderId,
      companyId: data.expressName,
      expressNumber: data.expressNumber,
      isSend: this.isSend,
      adminId: this.admin.getId()
    };
   console.log(body);
    this._integralOrderService.editExpressNo(body)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.message = "操作成功～";
            this.enableMessage = false;
            this.enableShow = true;
            this.expressName = '';
            this.expressNumber = '';
            this.msg = '';
            this.refresh();
          } else {
            if (data.msg) {
              this.message = data.msg;
            } else {
              this.message = "操作失败～";
            }
            this.enableMessage = false;
            this.enableShow = true;
          }
        }, err => {
          this.message = "连接服务器出错";
          this.enableMessage = false;
          this.enableShow = true;
        })
  }

  expressChange(express) {
    this.integralExpressList.forEach(element => {
      if(element.id == express) {
        this.express = element.company;
      }
    });
    this.setMsg();
  }

  expressCancel() {
    this.integralOrder = null;
    this.integralOrdered = null;
    this.enableMessage = false;
  }
}