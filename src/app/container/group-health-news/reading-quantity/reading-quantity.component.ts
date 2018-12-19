import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl} from '@angular/forms';
import { HealthNewsService,ReadCoefficientFormService} from '../_service';

declare var $: any;

@Component({
  selector: 'reading-quantity',
  templateUrl:'./reading-quantity.component.html',
  styleUrls: ['./reading-quantity.component.css']
})

export class ReadingQuantityComponent implements OnInit{
  @Input() data: any;
	@Input() enable: boolean;
	@Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  errorMessage;
  parameter:any;
  reading:string;
  id:any;
  type:number;
  types = [
    {id:"DOCTOR",name:"医生端"},
    {id:"SUFFERER",name:"患者端"}
  ]
  constructor(
    private _healthNewsService: HealthNewsService,
    private _readCoefficientFormService: ReadCoefficientFormService
  ) {}

  ngOnInit() {
    this.ReadCoefficientForm();  
  }

  ReadCoefficientForm(){
    if(this.data.quantity === "reading"){
      this.reading = this.data.quantity;
      this.modalTitle = "配置阅读量系数";
      if(this.data.reading && this.data.reading.length !== 0){
        this.parameter = this.data.reading[0].parameter;
        this.type = this.data.reading[0].type;
        this.id = this.data.reading[0].id;
      } 
    }else if(this.data.quantity === "thumb"){
      this.modalTitle = "配置点赞量系数";
      if(this.data.reading && this.data.reading.length !== 0){
        this.parameter = this.data.reading[0].parameter;
        this.type = this.data.reading[0].type;
        this.id = this.data.reading[0].id;
      }
    } 
  }

  getClient(type){
    if(type == "DOCTOR" && this.data.reading && this.data.reading.length !== 0){
      this.parameter = this.data.reading[0].parameter;
      this.type = this.data.reading[0].type;
      this.id = this.data.reading[0].id;
    }else if(type == "SUFFERER" && this.data.reading && this.data.reading.length !== 0){
      this.parameter = this.data.reading[1].parameter;
      this.type = this.data.reading[1].type;
      this.id = this.data.reading[1].id;
    }
  }

  //提交保存信息
  getSave(data){
    if(this.data.quantity === "thumb"){
      data.type = "doctor";
      this._healthNewsService.healthNewsThumb(data)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.handleEmit.emit("配置医生点赞量参数成功！");
            this.close();
          } else {
            if (data.msg) {
              this.errorMessage = data.msg;
            } else {
              this.errorMessage = "操作失败！";
            }
          }
        }, err => {
          this.errorMessage = "啊哦！访问出错啦～";
        })
    }else if(this.data.quantity === "reading"){
      this._healthNewsService.healthNewsReading(data)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.handleEmit.emit("配置阅读量参数成功！");
            this.close();
          } else {
            if (data.msg) {
              this.errorMessage = data.msg;
            } else {
              this.errorMessage = "操作失败！";
            }
          }
        }, err => {
          this.errorMessage = "啊哦！访问出错啦～";
        })
    }
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }
}