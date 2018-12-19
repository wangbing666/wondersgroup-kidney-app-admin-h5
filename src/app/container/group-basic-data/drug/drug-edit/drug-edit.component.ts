import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DrugFormService, DrugService } from '../_service';

@Component({
  selector: 'app-drug-edit',
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
export class DrugEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  enables: any;
  errorMessage: string;

  constructor(
    private _drugFormService: DrugFormService,
    private _drugService: DrugService
  ) {}

  ngOnInit() { 
    this.setDrugForm();
  }

    setDrugForm() {
        if (this.data) {
          // console.log(this.data);
          this.modalTitle = "编辑药品信息";
          this.formDatas = this._drugFormService.setForm(this.data);
        } else {
          this.modalTitle = "新增药品信息";
          this.formDatas = this._drugFormService.setForm();
        }

  }

  getValue(value) {
    // console.log(value);
    if (this.data) {
      this._drugService.drugEdit(value.id, value)
        .catch(
          err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            // console.log(data.data);
            if (data.code === 0) {
              
              this.handleEmit.emit("药品数据修改成功！");
              // console.log(data.ret_values.content);
              this.close();
            } else {
              this.errorMessage = "保存失败～请重新操作！";
            }
          })

    } else {
      this._drugService.drugCreate(value)
        .catch(
          err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            // console.log(data.code);
            if (data.code === 0) {
              this.handleEmit.emit("药品数据保存成功！");
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
