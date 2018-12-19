import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HealthFormService, HealthService } from '../_service';

@Component({
  selector: 'app-health-edit',
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
export class HealthEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  constructor(
    private _healthFormService: HealthFormService,
    private _healthService: HealthService
  ) {}

  ngOnInit() { 
    this.setHealthForm();
  }

  setHealthForm() {
        if (this.data) {
          this.modalTitle = "编辑第三方机构";
          this.formDatas = this._healthFormService.setThirdPartyForm(this.data);
        } else {
          this.modalTitle = "新增第三方机构";
          this.formDatas = this._healthFormService.setThirdPartyForm();
        }
}

getValue(value) {
    // console.log(value);
     if (this.data) {
      // console.log(this.data.id);
      this._healthService.thirdPartyEdit(value.id,value)
        .catch(
          err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            // console.log(data);
            if (data.code === 0) {
              this.handleEmit.emit("第三方机构改成功！");
              this.close();
            } else {
              this.errorMessage = "保存失败～请重新操作！";
            }
          })

    } else {
      this._healthService.thirdPartyCreate(value)
        .catch(
          err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("第三方机构保存成功！");
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