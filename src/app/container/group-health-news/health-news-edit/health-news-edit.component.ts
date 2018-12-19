import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { HealthNewsService, HealthNewsFormService } from '../_service';

@Component({
  selector: 'health-news-edit',
  template: `
  <edit-component 
    *ngIf="formDatas"
    [modalTitle]="modalTitle" 
    [errorMessage]="errorMessage" 
    [formDatas]="formDatas" 
    (valueEmmit)="getValue($event)"
    (closeEmmit)="close()"
  >
  </edit-component>
  `
})
export class HealthNewsEditComponent implements OnInit{
  @Input() data: any;
  @Input() typeList: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter(); 

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  constructor(
    private _healthNewsService: HealthNewsService,
    private _healthNewsFormService: HealthNewsFormService
  ) {}

  ngOnInit() {
    if (this.typeList) {
      this.setHealthNewsForm();
    } else {
      this.errorMessage = '数据错误～';
    }
  }

  setHealthNewsForm() {
    if (this.data) {
      if(this.data.postoperativeClassification){
        this.data.client = "患者";
      }else{
        this.data.client = "医生";
      }
      this.modalTitle = "编辑健康资讯信息";
      this.formDatas = this._healthNewsFormService.setForm(this.typeList, this.data);
    } else {
      this.modalTitle = "新增健康资讯信息";
      this.formDatas = this._healthNewsFormService.setForm(this.typeList);
    }
  }

  getValue(value) {
    this.getJudgeUrl(value);
    if(value.client == "患者" ){
      delete value.client;
      if (this.data) {
        this._healthNewsService.healthNewsUpdate(value)
          .subscribe(
            data => {
              if (data.code === 0) {
                this.handleEmit.emit("健康资讯分类修改成功！");
                this.close();
              } else {
                this.errorMessage = "保存失败～请重新操作！";
              }
            },err => {
              this.errorMessage = "啊哦！接口访问出错啦～";
            })
        } else {
        this._healthNewsService.healthNewsCreate(value)
          .subscribe(
            data => {
              if (data.code === 0) {
                this.handleEmit.emit("健康资讯分类保存成功！");
                this.close();
              } else {
                this.errorMessage = "保存失败～请重新操作！";
              }
            },err => {
              this.errorMessage = "啊哦！接口访问出错啦～";
          })
      }
    }else{
      delete value.client;
      if (this.data) {
        this._healthNewsService.healthNewsDoctorUpdate(value)
          .subscribe(
            data => {
              if (data.code === 0) {
                this.handleEmit.emit("健康资讯分类修改成功！");
                this.close();
              } else {
                this.errorMessage = "保存失败～请重新操作！";
              }
            },err => {
              this.errorMessage = "啊哦！接口访问出错啦～";
          })
      } else {
        this._healthNewsService.healthNewsDoctorCreate(value)
          .subscribe(
            data => {
              if (data.code === 0) {
                this.handleEmit.emit("健康资讯分类保存成功！");
                this.close();
              } else {
                this.errorMessage = "保存失败～请重新操作！";
              }
            },err => {
              this.errorMessage = "啊哦！接口访问出错啦～";
          })
      }
    }
  }

  getJudgeUrl(data){
   if(data.url){
     data.postoperativeUrl = 0;
   }else{
     data.postoperativeUrl = 1;
   }
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }
}