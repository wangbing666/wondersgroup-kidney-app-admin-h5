import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NewsClassifyService, NewsClassifyFormService } from '../_service';

@Component({
  selector: 'news-classify-edit',
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
export class NewsClassifyEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  constructor(
    private _newsClassifyService: NewsClassifyService,
    private _newsClassifyFormService: NewsClassifyFormService
  ) {}

  ngOnInit() {
    this.setNewsClassifyForm();
  }

  setNewsClassifyForm() {
    if (this.data) {
      this.modalTitle = "编辑健康咨询分类数据";
      this.formDatas = this._newsClassifyFormService.setForm(this.data);
    } else {
      this.modalTitle = "新增健康咨询分类数据";
      this.formDatas = this._newsClassifyFormService.setForm();
    }
  }

  getValue(value) {
    // console.log(value);
    if (this.data) {
      this._newsClassifyService.newsClassifyUpdate(value.id, value.name)
        .catch(
          err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("健康咨询分类数据修改成功！");
              this.close();
            } else {
              this.errorMessage = "保存失败～请重新操作！";
            }
          })

    } else {
      this._newsClassifyService.newsClassifyCreate(value.name)
        .catch(
          err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("健康咨询分类数据保存成功！");
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
