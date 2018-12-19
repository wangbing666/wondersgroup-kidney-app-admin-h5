import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DiscomfortService, DiscomfortFormService } from '../_service';

@Component({
  selector: 'discomfort-symptom-edit',
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
export class DiscomfortEditComponent implements OnInit {
  @Input() data: any;
  @Input() typeList: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  constructor(
    private _discomfortService: DiscomfortService,
    private _discomfortFormService: DiscomfortFormService
  ) {}

  ngOnInit() {
    if (this.typeList) {
      this.setDiscomfortForm();
    } else {
      this.errorMessage = '数据错误～';
    }
  }

  setDiscomfortForm() {
    if (this.data) {
      this.modalTitle = "编辑不适症状";
      this.formDatas = this._discomfortFormService.setForm(this.typeList,this.data);
    } else {
      this.modalTitle = "新增不适症状";
      this.formDatas = this._discomfortFormService.setForm(this.typeList);
    }
  }

  getValue(value) {
    // console.log(value);
    if (this.data) {
      this._discomfortService.discomfortEdit(value.id,value)
        .catch(
          err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            // console.log(data);
            if (data.code === 0) {
              this.handleEmit.emit("不适症状修改成功！");
              this.close();
            } else {
              this.errorMessage = "保存失败～请重新操作！";
            }
          })

    } else {
      this._discomfortService.discomfortCreate(value)
        .catch(
          err => {
            // console.log(value);
            this.errorMessage = "啊哦！接口访问出错啦～";
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("不适症状保存成功！");
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
