import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { TableOption } from '../../../../entities';

import { DoctorTitleFormService, DoctorTitleService } from '../_service';


@Component({
  selector: 'doctor-title-edit',
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
export class DoctorTitleEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Input() status: string;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  constructor(
  	private _doctortitleService: DoctorTitleService,
    private _doctortitleFormService: DoctorTitleFormService,
  	) { }

  ngOnInit() {
  	this.setDoctorTitleForm();
  }


  setDoctorTitleForm() {
        if (this.data) {
          this.modalTitle = "编辑职称";
          this.formDatas = this._doctortitleFormService.setDoctorTitleForm(this.data);
        } else {
          this.modalTitle = "新增职称";
          this.formDatas = this._doctortitleFormService.setDoctorTitleForm();
      }
  }

  getValue(data) {

    if(this.data){
      this._doctortitleService.DoctorTitleEdit(data)
      .subscribe(
        data => { 
          if(data.code === 0){
            this.close();
            this.handleEmit.emit("修改成功！");
          }else if(data.code === -1){
             this.errorMessage = "与已有职称存在冲突！";
          }else{
            this.errorMessage = "修改失败～请重新操作！";
          }
        },err =>{
          this.errorMessage = "啊哦！接口访问出错啦～";
      })                                                        
    }else{
      this._doctortitleService.DoctorTitleCreate(data)
      .subscribe(
        data => { 
          if(data.code === 0){
            this.close();
            this.handleEmit.emit("添加成功！");
          }else if(data.code === -1){
              this.errorMessage = "此职称已存在！";
          }else{
            this.errorMessage = "添加失败～请重新操作！";
          }
        },err=>{
          this.errorMessage = "啊哦！接口访问出错啦～";
      })
    }
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}