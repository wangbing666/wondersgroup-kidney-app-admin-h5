import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  DoctorFormService,
  DoctorService,
} from '../_service';

@Component({
  selector: 'app-doctor-edit',
  template: `
  <edit-component 
    [modalTitle]="modalTitle" 
    [formDatas]="formDatas" 
    [errorMessage]="errorMessage"
    (valueEmmit)="getValue($event)"
    (closeEmmit)="close()"
  >
  </edit-component>
  `,
})
export class DoctorEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  hospitalList: any; // 医院选项列表
  departmentList: any; // 科室选项列表
  doctorTitleList: any; // 职称选项列表

  constructor(
    private _doctorFormService: DoctorFormService,
    private _doctorService: DoctorService,
  ) {}

  ngOnInit() {
    this.setDoctorForm();
  }

  setDoctorForm() {
    this.getOptions()
      .subscribe(() => {
        if (this.data) {
          this.modalTitle = "编辑医生信息";
          this.formDatas = this._doctorFormService
            .setForm(
              this.hospitalList,
              this.departmentList,
              this.doctorTitleList,
              this.data
            );
        } else {
          this.modalTitle = "新增医生信息";
          this.formDatas = this._doctorFormService
            .setForm(
              this.hospitalList,
              this.departmentList,
              this.doctorTitleList
            );
        }
      }, err => {
        this.errorMessage = "啊哦！访问出错啦～请稍后再来！";
      })
  }

  // 获取下拉框选项
  getOptions() {
    return this._doctorService.getOptions()
      .map(data => {
        if (data.code === 0) {
          this.hospitalList = data.data.hospital4BackendList;
          this.departmentList = data.data.departmentList;
          this.doctorTitleList = data.data.doctorTitleList;
        }
      })
  }

  getValue(data) {
    // console.log(data);
    if (this.data && this.data.key === 'edit') {
      this._doctorService.doctorUpdate(data)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("医生信息修改成功！");
              this.close();
            } else {
              if (data.msg) {
                this.errorMessage = data.msg;
              } else {
                this.errorMessage = "操作失败！";
              }
            }
          }, err => {
            this.errorMessage = "啊哦！访问出错啦～";
          })
    } else if (this.data && this.data.key === 'failureEdit') {
      this._doctorService.doctorFailureUpdate(data)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("医生信息修改成功！");
              this.close();
            } else {
              if (data.msg) {
                this.errorMessage = data.msg;
              } else {
                this.errorMessage = "操作失败！";
              }
            }
          }, err => {
            this.errorMessage = "啊哦！访问出错啦～";
          })
    } else {
      this._doctorService.doctorCreate(data)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("医生信息保存成功！");
              this.close();
            } else {
              if (data.msg) {
                this.errorMessage = data.msg;
              } else {
                this.errorMessage = "操作失败！";
              }
            }
          }, err => {
            this.errorMessage = "啊哦！访问出错啦～";
          })
    }
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
