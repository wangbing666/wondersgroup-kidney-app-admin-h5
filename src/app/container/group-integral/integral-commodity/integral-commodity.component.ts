import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TableOption } from '../../../entities';

import { IntegralCommodityService, IntegralCommodityTableService } from './_service';

@Component({
  selector: 'integral-commodity',
  templateUrl: './integral-commodity.component.html'
})
export class IntegralCommodityComponent implements OnInit {
  title = '积分管理';
  subTitle = '积分商品维护';

  integralCommodityTable: TableOption = new TableOption();

  integralCommodity: any;
  enableEdit: boolean;

  message: string;
  deleteMessage: string;

  enableShow: boolean;
  deleteShow: boolean;

  statusIdx: number;

  enabled: boolean;

  delData: any;

  enableOperate: boolean;
  deleteOperate: boolean;

  constructor(
    private _integralCommodityService: IntegralCommodityService,
    private _integralCommodityTableService: IntegralCommodityTableService
  ) {}

  ngOnInit() {
    this.getIntegralCommodityTitles();
    this.getIntegralCommodity(0);
  }

  getIntegralCommodityTitles() {
    this.integralCommodityTable.titles = this._integralCommodityTableService.setTitles();
  }

  refresh(){
    this.getIntegralCommodity(0);
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

  getIntegralCommodity(page: number) {
    this.integralCommodityTable.currentPage = page;
    this._integralCommodityService.getIntegralCommodity(20, page)
      .subscribe(
        data => {
          this.integralCommodityTable.loading = false;
          // console.log(data.data);
          if (data.data && data.data.content && data.data.length === 0 && data.code === 0) {
            this.integralCommodityTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.formatCommodity(data.data.content);
            this.integralCommodityTable.lists = data.data.content;
            this.integralCommodityTable.totalPage = data.data.totalPages;
            for (var i = 0; i < this.integralCommodityTable.lists.length; ++i) {
              this.integralCommodityTable.lists[i].createTime = this.getDate(this.integralCommodityTable.lists[i].createTime); 
            }
            // console.log(data.data.content); 
          } else {
            this.integralCommodityTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.integralCommodityTable.loading = false;
          this.integralCommodityTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  gotoHandle(data) {
    if (data.key == 'edit') {
      this.integralCommodity = data.value;
      // console.log(this.commodity);
      this.enableEdit = true;
    }
    if (data.key == 'updown') {
      this.delData = data.value;
      this.enableOperate = true;
      this.deleteOperate = false;
      if(data.value.enabled){
        this.message = "确定下架该数据？";
        this.enabled = false;
        data.value.updown = '下架';
      }else{
        this.message = "确定上架该数据？";
        this.enabled = true;
        data.value.updown = '上架';
      }
    }
    if (data.key == 'del'){
      this.delData = data.value;
      this.enableOperate = false;
      this.deleteOperate = true;
      this.deleteMessage = "确定删除该数据？";
    }
  }

  formatCommodity(list: Array < any > ) {
    list.forEach(data => {
      data.username = data.backendAdministrator.username;
      data.point = data.price.point;
      data.updown = data.enabled ? '下架' : '上架';
    });
  }

  newIntegralCommodity(){
    this.integralCommodity = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.getIntegralCommodity(0);
  }

  operate(){
    //   console.log(this.delData.id);
    //   console.log(this.enabled);
    this._integralCommodityService.integralCommodityEnabled(this.delData.id, this.enabled)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.delOperate();
            this.message = "操作成功";
            this.enableShow = true;
            this.deleteShow = false;
            this.getIntegralCommodity(0);
          } else {
            this.delOperate();
            
            if (data.msg) {
              this.message = data.msg;
            } else {
              this.message = "操作失败";
            }
            this.enableShow = true;
            this.deleteShow = false;
          }
        }, err => {
          this.delOperate();
          this.message = "操作失败";
          this.enableShow = true;
          this.deleteShow = false;
          return Observable.throw(err);
        })
  }

   deletOperate(){
    //   console.log(this.delData.id);
      this._integralCommodityService.integralCommodityDelete(this.delData.id)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.delOperate();
            this.deleteMessage = "操作成功";
            this.deleteShow = true;
            this.enableShow = false;
            this.getIntegralCommodity(0);
          } else {
            this.delOperate();
            
            if (data.msg) {
              this.deleteMessage = data.msg;
            } else {
            //    console.log(this.delData.id);
              this.deleteMessage = "操作失败";
            }
            this.deleteShow = true;
            this.enableShow = false;
          }
        }, err => {
          this.delOperate();
          this.deleteMessage = "操作失败";
          this.deleteShow = true;
          this.enableShow = false;
          return Observable.throw(err);
        })
  }


  delOperate() {
    this.delData = null;
    this.enableOperate = false;
    this.deleteOperate = false;
  }
}
