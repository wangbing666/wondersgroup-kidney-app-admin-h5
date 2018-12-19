import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BasicServiceFormService, BasicServiceService } from '../_service';


@Component({
  selector: 'basic-service-edit',
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
export class BasicServiceEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;

  enables: any;

  errorMessage: string;

  constructor(
    private _basicServiceFormService: BasicServiceFormService,
    private _basicServiceService: BasicServiceService
  ) {}

  ngOnInit() {
    this.enables = [
      {
        id:true,
        name:'启用'
      },{
        id:false,
        name:'禁用'
      }
      
    ];

    this.setBasicServiceForm();
  }

  setBasicServiceForm() {
    if (this.data) {
          this.modalTitle = "编辑医生服务";
          this.formDatas = this._basicServiceFormService.setForm(this.data);
        } else {
          this.modalTitle = "新增医生服务";
          this.formDatas = this._basicServiceFormService.setForm();
        }
  }

   getValue(value) {
    // console.log(data);
    if (this.data) {
      this._basicServiceService.basicServiceEdit(this.data.id,value)
        .catch(
          err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            // console.log(data);
            if (data.code === 0) {
              this.handleEmit.emit("医生服务修改成功！");
              this.close();
            } else {
              this.errorMessage = "保存失败～请重新操作！";
            }
          })

    } else {
      this._basicServiceService.basicServiceCreate(value)
        .catch(
          err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
            return Observable.throw(err);
          })
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("医生服务保存成功！");
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