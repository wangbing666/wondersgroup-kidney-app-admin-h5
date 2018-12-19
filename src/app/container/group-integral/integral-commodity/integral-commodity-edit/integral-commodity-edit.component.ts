import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IntegralCommodityFormService, IntegralCommodityService } from '../_service';

@Component({
  selector: 'integral-commodity-edit',
  template: `
  <edit-component 
    *ngIf="formDatas"
    [modalTitle]="modalTitle" 
    [formDatas]="formDatas" 
    [errorMessage]="errorMessage" 
    (valueEmmit)="getValue($event)"
    (closeEmmit)="close()"
  >
  </edit-component>
  `,
})
export class IntegralCommodityEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;


  constructor(
    private _IntegralCommodityFormService: IntegralCommodityFormService,
    private _IntegralCommodityService: IntegralCommodityService
  ) {}

  ngOnInit() {
    // console.log(this.data);
    this.setIntegralCommodityForm();
  }

  setIntegralCommodityForm() {
    if (this.data) {
      this.modalTitle = "编辑商品信息";
      // console.log(this.data);
      this.formDatas = this._IntegralCommodityFormService.setForm(this.data);
    } else {
      this.modalTitle = "新增商品信息";
      this.formDatas = this._IntegralCommodityFormService.setForm();
    }
  }

  getValue(data) {
     if(this.data){
      //  console.log(this.data);
      this._IntegralCommodityService.integralCommodityUpdate(data)
      .subscribe(
        data => { 
        //   console.log(data);
          if(data.code === 0){
            this.close();
            this.handleEmit.emit("修改成功！");
          }else{
            this.errorMessage = "修改失败～请重新操作！";
          };
        }),err =>{
          this.errorMessage = "啊哦！接口访问出错啦～";
      }                                                        
    }else{
      this._IntegralCommodityService.integralCommodityUpdate(data)
      .subscribe(
        data => { 
        //   console.log(data);
          if(data.code === 0){
            this.close();
            this.handleEmit.emit("添加成功！");
          }else{
            this.errorMessage = "添加失败～请重新操作！";          }
        }),err =>{
          this.errorMessage = "啊哦！接口访问出错啦～";
      } 
    }
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
