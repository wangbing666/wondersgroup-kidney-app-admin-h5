import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { InspectionCategoryService, InspectionCategoryFormService } from '../_service';

@Component({
  selector: 'app-inspection-category-edit',
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
export class InspectionCategoryEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter <any> = new EventEmitter();
  @Output() handleEmit: EventEmitter <any> = new EventEmitter();

  modalTitle: string;
  formDatas: any;

  errorMessage: string;

  constructor(
    private _inspectionCategoryService: InspectionCategoryService,
    private _inspectionCategoryFormService: InspectionCategoryFormService
  ) {

  }

  ngOnInit() {
    this.setInspectionCategoryForm();
  }

  setInspectionCategoryForm() {
    if (this.data) {
      this.modalTitle = "编辑检查类目";
      this.formDatas = this._inspectionCategoryFormService.setForm(this.data);
    } else {
      this.modalTitle = "新增检查类目";
      this.formDatas = this._inspectionCategoryFormService.setForm();
    }
  }

  getValue(value) {
    // console.log(value);
    if (this.data) {
      this._inspectionCategoryService.inspectionCategoryEdit(value)
        .subscribe(
          res => {
            if (res.code === 0) {
              this.handleEmit.emit("检查类目修改成功！");
              this.close();
            } else {
              if(res.msg) {
                this.errorMessage = res.msg;
              } else {
                this.errorMessage = "保存失败～请重新操作！";
              }
            }
          }, err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
          })

    } else {
      this._inspectionCategoryService.inspectionCategoryCreate(value)
        .subscribe(
          res => {
            if (res.code === 0) {
              this.handleEmit.emit("检查类目保存成功！");
              this.close();
            } else {
              if(res.msg) {
                this.errorMessage = res.msg;
              } else {
                this.errorMessage = "保存失败～请重新操作！";
              }
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