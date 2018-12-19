import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { AdDoctorService, AdDoctorFormService } from '../_service';

@Component({
  selector: 'ad-doctor-edit',
  templateUrl: './ad-doctor-edit.component.html' 
})
export class AdDoctorEditComponent implements OnInit {

  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  constructor(
    private _adService: AdDoctorService,
    private _adFormService: AdDoctorFormService,
    @Inject('admin') private admin,
  ) {}

  ngOnInit() {
    this.setAdForm();
  }

  //编辑时间转换
  getTime(time) {
    var date = new Date(time);
    var Y = date.getFullYear().toString();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString();
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()).toString();
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()).toString();
    return `${Y}-${M}-${D}T${h}:${m}`
  }


  setAdForm() {
    if (this.data) {
      this.modalTitle = "编辑广告";
      this.formDatas = this._adFormService.setAdDoctorForm(this.data);
    } else {
      this.modalTitle = "新增广告";
      this.formDatas = this._adFormService.setAdDoctorForm();
    }
  }

  // //提交时间转换
  // getAdTime(date) {
  //   var newstr = date.replace("T"," "); 
  //   var time = new Date(newstr.replace(/-/g, '/'));
  //   return time.getTime();
  // }

  //提交保存信息
  getValue(data) {
    // console.log(this.data);
    // console.log(data);
    //修改讲座
    if (this.data) {
      // data['backendAdministrator'] = this.admin.getName();
      data['id'] = this.data.id;
      // console.log(data);
      this._adService.adEdit(data)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("广告修改成功！");
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
      // console.log("aaa");
    } else {
      data['backendAdministrator'] = this.admin.getName();
      this._adService.adNew(data)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("新增广告成功！");
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

  //关闭模态框
  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }
}
