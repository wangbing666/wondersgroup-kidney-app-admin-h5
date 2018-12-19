import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HealthServiceFormService, HealthServiceService } from '../_service';

@Component({
  selector: 'health-service-edit',
  template: `
  <edit-component 
    *ngIf="formDatas"
    [modalTitle]="modalTitle" 
    [formDatas]="formDatas" 
    [errorMessage]="errorMessage" 
    (valueEmmit)="getValue($event)"
    (closeEmmit)="close()"
  >
  </edit-component>
  <modal-edit *ngIf="enableShow" [title]="'提示信息'" [message]="message" [(enable)]="enableShow"></modal-edit>
  `,
})
export class HealthServiceEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;


  //展示信息模态框
  message: string;
  enableShow: boolean;
  errorMessage: string;

  HealthServiceDetails: any;

  serviceList: any; // 服务列表

  constructor(
    private _healthserviceService: HealthServiceService,
    private _healthserviceFormService: HealthServiceFormService,
  ) {}

  ngOnInit() {
    this.setDoctorForm();
  }

  setDoctorForm() {
    this.getOptions()
      .subscribe(() => {
        if (this.data.id) {  
          this.modalTitle = "编辑第三方服务";
          this._healthserviceService.healthServiceDetails(this.data.id)
          .subscribe(
            data => {
              if(data.code === 0){
                let list = data.data;
                this.formDatas = this._healthserviceFormService.setForm(this.serviceList, list);
              }
            })
        } else {
          this.modalTitle = "新增第三方服务";
          this.formDatas = this._healthserviceFormService
            .setForm(
              this.serviceList,
            );
        }
      })
  }

  //获取下拉框选项
  getOptions() {
    return this._healthserviceService.getorganization()
      .map(data => {
        if (data.code === 0) {
          this.serviceList = data.data;
        }
      });
  }

  getValue(data) {
     if(this.data.id){
      this.enableShow = true;
      this.message = "正在保存，请稍后...";
      this._healthserviceService.healthServiceEdit(this.data.id,data)
      .subscribe(
        data => { 
          if(data.code === 0){
            this.enableShow = false;
            this.close();
            this.handleEmit.emit("修改成功！");
          }else{
            this.enableShow = false;
            this.errorMessage = "修改失败～请重新操作！";
          };
        }),err => {
          this.enableShow = false;
          this.formDatas.errorMessage = "啊哦！接口访问出错啦～";
      }                                                        
    }else{
      this.enableShow = true;
      this.message = "正在保存，请稍后...";
      this._healthserviceService.healthServiceCreate(data)
      .subscribe(
        data => { 
          if(data.code === 0){
            this.enableShow = false;
            this.close();
            this.handleEmit.emit("添加成功！");
          }else{
            this.enableShow = false;
            this.errorMessage = "添加失败～请重新操作！";          
            }
        }),err => {
          this.enableShow = false;
          this.formDatas.errorMessage = "啊哦！接口访问出错啦～";
      }
    }
  }
  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }



}
