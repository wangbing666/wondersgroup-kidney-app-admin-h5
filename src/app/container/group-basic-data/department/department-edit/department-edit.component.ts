import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DepartmentFormService, DepartmentService } from '../_service';

@Component({
  selector: 'app-department-edit',
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

export class DepartmentEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter <any> = new EventEmitter();
  @Output() handleEmit: EventEmitter <any> = new EventEmitter();

  modalTitle: string;
  formDatas: any;

  errorMessage: string;

  constructor(
    private _departmentFormService: DepartmentFormService,
    private _departmentService: DepartmentService
  ) {

  }

  ngOnInit() {
    this.setDepartmentForm();
  }

  setDepartmentForm() {
    if (this.data) {
      this.modalTitle = "编辑科室";
      this.formDatas = this._departmentFormService.setDepartmentForm(this.data);
    } else {
      this.modalTitle = "新增科室";
      this.formDatas = this._departmentFormService.setDepartmentForm();
    }
  }

  getValue(value) {
    if (this.data) {
      this._departmentService.departmentEdit(value.id, value.name)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("科室数据修改成功！");
              this.close();
            } else {
              this.errorMessage = "保存失败～请重新操作！";
            }
          }, err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
          })

    } else {
      this._departmentService.departmentCreate(value.name)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("科室数据保存成功！");
              this.close();
            } else {
              this.errorMessage = "保存失败～请重新操作！";
            }
          }, err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
          })
    }
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}