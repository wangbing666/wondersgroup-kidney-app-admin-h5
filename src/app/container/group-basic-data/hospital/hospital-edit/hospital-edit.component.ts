import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HospitalFormService, HospitalService } from '../_service';

@Component({
  selector: 'app-hospital-edit',
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
  `,
})
export class HospitalEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  constructor(
    private _hospitalFormService: HospitalFormService,
    private _hospitalService: HospitalService
  ) {}

  ngOnInit() { 
    this.setHospitalForm();
  }
    
    setHospitalForm() {
        if (this.data) {
          this.modalTitle = "编辑医院信息";
          this.formDatas = this._hospitalFormService.setHospitalForm(this.data);
        } else {
          this.modalTitle = "新增医院信息";
          this.formDatas = this._hospitalFormService.setHospitalForm();
        }

  }

  getValue(value) {
    // console.log(data);
    if (this.data) {
      // console.log(this.data.id);
      this._hospitalService.hospitalEdit(value.id,value.name)
        .catch(
          err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            // console.log(data);
            if (data.code === 0) {
              this.handleEmit.emit("医院数据修改成功！");
              this.close();
            } else {
              this.errorMessage = "保存失败～请重新操作！";
            }
          })

    } else {
      this._hospitalService.hospitalCreate(value.name)
        .catch(
          err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("医院数据保存成功！");
              this.close();
            } else {
              this.errorMessage = "保存失败～请重新操作！";
            }
          })
    }
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }
}
