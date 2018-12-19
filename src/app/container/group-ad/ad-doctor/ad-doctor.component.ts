import { Component, OnInit, Inject } from '@angular/core';

import { TableOption } from '../../../entities';

import { AdDoctorService , AdDoctorTableService } from './_service';

@Component({
  selector: 'app-ad-doctor',
  templateUrl: './ad-doctor.component.html',
  styleUrls: ['./ad-doctor.component.css']
})
export class AdDoctorComponent implements OnInit {

  title = '广告位管理';
  subTitle = '广告位管理-医生端';
  loading: boolean = true;

  // 展示信息模态框选项
  titleShow: string;
  message: string;
  enableShow: boolean;
  errorMessage: string;

  Ad: any;
  enableEdit: boolean;

  imgUrls: Array < any > ;
  enableImg: boolean;

  enableProcess: boolean;
  processMessage: string;
  processData: any;
  data: any;

  adTable: TableOption = new TableOption();

  constructor(
    private _adService: AdDoctorService,
    private _adTableService: AdDoctorTableService,
    @Inject('admin') private admin
  ) {}

  ngOnInit() {
    this.getAdTitles();
    this.getAds(0);
  }

  getAdTitles() {
    this.adTable.titles = this._adTableService.setAdDoctorTitles();
  }

  getAds(page: number) {
    this.adTable.errorMessage = '';
    this.adTable.loading = true;
    this.adTable.lists = null;
    this.adTable.currentPage = page;
    this._adService.getAdList(page)
      .subscribe(
        data => {
          this.adTable.loading = false;
          if (data.data && data.data.totalElements === 0 && data.code === 0) {
            this.adTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.code === 0) {
            // console.log(data.data.content);
            data.data.content.forEach(data => {
              data.updown = (data.status=="下架") ? '上架' : '下架';
              data.status = (data.status=="上架") ? '发布中' : '已下架';
            });
            this.adTable.lists = data.data.content;
            this.adTable.totalPage = data.data.totalPages;
          } else {
            this.adTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.adTable.loading = false;
          this.adTable.errorMessage = "啊哦！接口访问出错啦～";
        });
    }
    //时间转换
  getTime(time) {
    var date = new Date(time);
    var Y = date.getFullYear().toString();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString();
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()).toString();
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()).toString();
    var datetime = `${Y}-${M}-${D}T${h}:${m}`;
    return datetime.replace("T", " ");
  }
 

  //编辑讲座
  gotoHandle(data) {
    if (data.key === "updown") {//上线
      if(data.value.updown === "上架"){
        this.processMessage = '你确定要上线？';
      }else{
        this.processMessage = '你确定要下线？';
      }
      this.processData = data;
      this.enableProcess = true;
    } else if (data.key === "edit") {//修改
      // console.log(data.value);
      this.Ad = data.value;
      this.enableEdit = true;
    } else if (data.key === "delete") {//删除
      this.processData = data;
      this.processMessage = '你确定要删除？';
      this.enableProcess = true;
    } 
  }
    //刷新页面
  refresh() {
    this.getAds(0);
  }

  //新增讲座
  newAd() {
    this.Ad = null;
    this.enableEdit = true;
  }


  // 确定上线、下线、删除
  process() {
    // console.log(this.processData);
    if(this.processData.key === "delete") {
      this._adService.adDelete(this.processData.value.id)
        .subscribe(
          data => {
            this.enableProcess = false;
            if (data.code === 0) {
              this.titleShow = "提示信息";
              this.message = "操作成功";
              this.enableShow = true;
              this.refresh();
            } else {
              this.titleShow = "提示信息";
              this.message = "操作失败";
              this.enableShow = true;
            }
          }, err => {
            this.enableProcess = false;
            this.titleShow = "提示信息";
            this.message = "啊哦！删除出错啦～";
            this.enableShow = true;
          });
    }else if(this.processData.key === "updown"){
      var status;
      if(this.processData.value.updown === "上架"){
        status = 0;
      }else{
        status = 1;
      }
      // console.log(status);
      this._adService.adStatus(this.processData.value.id, status)
        .subscribe(
          data => {
            this.enableProcess = false;
            if (data.code === 0) {
              this.titleShow = "提示信息";
              this.message = "操作成功";
              this.enableShow = true;
              this.refresh();
            } else {
              this.titleShow = "提示信息";
              this.message = "操作失败";
              this.enableShow = true;
            }
          }, err => {
            this.enableProcess = false;
            this.titleShow = "提示信息";
            this.message = "啊哦！上下架出错啦～";
            this.enableShow = true;
          });
    }else{
      this.enableProcess = false;
      this.titleShow = "提示信息";
      this.message = "啊哦！访问出错啦～";
      this.enableShow = true;
    }
  }

  //取消上线、下线、删除
  processCancel() {
    this.processData = null;
    this.processMessage = '';
    this.enableProcess = false;
  }

  //返回服务器信息
  handleSuccess(data) {
    this.titleShow = '提示信息';
    this.message = data;
    this.enableShow = true;
    this.refresh();
  }

}
