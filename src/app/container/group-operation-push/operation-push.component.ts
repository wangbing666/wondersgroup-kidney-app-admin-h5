import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../entities';

import { OperationPushTableService ,OperationPushService } from './_service';

@Component({
  selector: 'app-operation-push',
  templateUrl: './operation-push.component.html',
  styleUrls: ['./operation-push.component.css']
})
export class OperationPushComponent implements OnInit {

	title = '运营消息推送';
  subTitle = '运营推送';

  titleShow: string;
  message: string;
  enableShow: boolean;
  errorMessage:string;

	operationpush:any;
  enableEdit: boolean;

  enableProcess: boolean;
  processMessage: string;
  processData: any;

	operationPushTable: TableOption = new TableOption();
	operationPushDoctorTable: TableOption = new TableOption();

  constructor(
  	private _operationpushservice : OperationPushService,
  	private _operationpushtableservice: OperationPushTableService
  	) { }

  ngOnInit() {
  	this.refresh();
  }

  refresh(){
    this.getOperationPushTitles()
    this.getOperationPushUser(0);
    this.getOperationPushDoctor(0);
  }

  getOperationPushTitles(){
  	this.operationPushTable.titles = this._operationpushtableservice.setTitles();
  }

  getOperationPushUser(page:number){
    this.operationPushTable.errorMessage = '';
    this.operationPushTable.loading = true;
    this.operationPushTable.lists = null;
    this.operationPushTable.currentPage = page;
  	this._operationpushservice.getOperationPush(0,20,page).subscribe(
  		data => {
  			this.operationPushTable.loading = false;
  				if (data.data && data.data.length === 0 && data.code === 0) {
            this.operationPushTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.operationPushTable.totalPage = data.data.totalPages;
            this.operationPushTable.lists = data.data.content; 
            for (var i = 0; i < this.operationPushTable.lists.length; ++i) {
            	this.operationPushTable.lists[i].pushTime =this.getDate(this.operationPushTable.lists[i].pushTime); 
            }
          } else {
            this.operationPushTable.errorMessage = "空空如也～";
          }
  		},err =>{
  			this.operationPushTable.loading = false;
        this.operationPushTable.errorMessage = "啊哦！接口访问出错啦～";
  		})
  }

  getOperationPushDoctor(page:number){
    this.operationPushDoctorTable.errorMessage = '';
    this.operationPushDoctorTable.loading = true;
    this.operationPushDoctorTable.lists = null;
    this.operationPushDoctorTable.currentPage = page;
  	this._operationpushservice.getOperationPush(1,20,page).subscribe(
  		data => {
  			this.operationPushDoctorTable.loading = false;
  				if (data.data && data.data.length === 0 && data.code === 0) {
            this.operationPushDoctorTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.operationPushDoctorTable.totalPage = data.data.totalPages;
            this.operationPushDoctorTable.lists = data.data.content;
            for (var i = 0; i < this.operationPushDoctorTable.lists.length; ++i) {
              this.operationPushDoctorTable.lists[i].pushTime =this.getDate(this.operationPushDoctorTable.lists[i].pushTime); 
            } 
          } else {
            this.operationPushDoctorTable.errorMessage = "空空如也～";
          }
  		},err =>{
  			this.operationPushDoctorTable.loading = false;
        this.operationPushDoctorTable.errorMessage = "啊哦！接口访问出错啦～";
  		})
  }

  gotoHandle(value,data) {
      if (value === "edit") {
        this.operationpush = data;
        this.enableEdit = true;
      } else if (value === "send") {
        this.processData = data;
        this.processData.key = value;
        this.processMessage = '你确定要发送？';
        this.enableProcess = true;
      } else if ( value === "delete"){
      	this.processData = data;
        this.processData.key = value;
        this.processMessage = '你确定要删除？';
        this.enableProcess = true;
      }
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

  newOperationPush(){
  	this.operationpush = null;
    this.enableEdit = true;
  }

  //确定发送,删除
  process() {
    if(this.processData.key === "send"){
       this._operationpushservice.operationPushSend(this.processData.pushId)
        .subscribe(
          data => {
            this.enableProcess = false;
            if (data.code === 0) {
              this.titleShow = "提示信息"
              this.message = "操作成功";
              this.enableShow = true;
              this.refresh();
            } else {
              this.titleShow = "提示信息"
              this.message = "操作失败";
              this.enableShow = true;
            }
          }, err => {
            this.enableProcess = false;
            this.titleShow = "提示信息"
            this.message = "啊哦！访问出错啦～";
            this.enableShow = true;
        })
    }else{
      this._operationpushservice.operationPushDelete(this.processData.pushId)
        .subscribe(
          data => {
            this.enableProcess = false;
            if (data.code === 0) {
              this.titleShow = "提示信息"
              this.message = "操作成功";
              this.enableShow = true;
              this.refresh();
            } else {
              this.titleShow = "提示信息"
              this.message = "操作失败";
              this.enableShow = true;
            }
          }, err => {
            this.enableProcess = false;
            this.titleShow = "提示信息"
            this.message = "啊哦！访问出错啦～";
            this.enableShow = true;
        })
    }
    
  }

  //取消发送、删除
  processCancel() {
    this.processData = null;
    this.processMessage = '';
    this.enableProcess = false;
  }

  handleSuccess(data){
    this.titleShow = '提示信息';
    this.message = data;
    this.enableShow = true;
    this.refresh();
  }
}
