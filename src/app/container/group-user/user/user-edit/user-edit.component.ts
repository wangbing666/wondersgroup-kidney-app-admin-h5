import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserFormService, UserService } from '../_service';


@Component({
  selector: 'user-edit',
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
export class UserEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  //展示信息模态框
  message: string;
  enableShow: boolean;

  hospitalList: any; // 医院选项列表
  kidneyList: any;  //肾源列表
  constructor(
    private _userFormService: UserFormService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.setDoctorForm();
  }

  setDoctorForm() {
    this.getOptions()
      .subscribe(() => {
        if (this.data.id) {
          this.modalTitle = "编辑用户";
          this.formDatas = this._userFormService
          .setForm(
              this.hospitalList,
              this.kidneyList,
              this.data
            );
        } else {
          this.modalTitle = "新增用户";
          this.formDatas = this._userFormService
            .setForm(
              this.hospitalList,
              this.kidneyList
            );
        }
      })

  }

  //获取下拉框选项
  getOptions() {
    return this._userService.getKidney()
      .map(data => {
        if (data.code === 0) {
        this.hospitalList = data.data.hospital4BackendList;
        this.kidneyList = data.data.kidneySourceList;
         }
      });
  }

  getValue(data) {
      //获取当前ID
      data.id = this.data.id;
      //将日期转换成时间戳
     if(data.birthday || data.kidneyDate){
       var date = data.birthday;
       var kidneyDate = data.kidneyDate;
       date = new Date(Date.parse(date.replace(/-/g, "/")));
       kidneyDate = new Date(Date.parse(kidneyDate.replace(/-/g, "/")))
       data.birthday = date.getTime();
       data.kidneyDate = kidneyDate.getTime();
     }

     //性别转换
     if(data.gender == "0"){
       data.gender = "Male";
     }else if(data.gender == "1"){
       data.gender = "Female";
     }


     if(this.data.id){
      this.enableShow = true;
      this.message = "正在保存，请稍后...";
      this._userService.userUpdate(data)
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
        },err =>{
          this.enableShow = false;
          this.errorMessage = "啊哦！接口访问出错啦～";
      })                                                      
    }else{
      this.enableShow = true;
      this.message = "正在保存，请稍后...";
      this._userService.userCreate(data)
      .subscribe(
        data => { 
          if(data.code === 0){
            this.enableShow = false;
            this.close();
            this.handleEmit.emit("添加成功！");
          }else{
            this.enableShow = false;
            this.errorMessage = "添加失败～请重新操作！";          }
        },err =>{
          this.enableShow = false;
          this.errorMessage = "啊哦！接口访问出错啦～";
      })
    }
  }


  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }
}
