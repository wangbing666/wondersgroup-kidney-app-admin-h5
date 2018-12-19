import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

import { PushTimeService} from '../_service';

declare var $: any;
declare var flatpickr: any;

@Component({
  selector: 'push-time-edit',
  templateUrl: './push-time-edit.component.html',
  styleUrls: ['./push-time-edit.component.css']
})
export class PushTimeEditComponent implements OnInit {

	@Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  errorMessage: string;
  userPushTime:any;
  project:any;
  id:any;

  constructor(
  	private _pushtimeservice: PushTimeService
  	) { }

  ngOnInit() {
  	this.pushtimeedit();
  	this.date();
  }

  pushtimeedit(){
  	this.project = this.data.value.pushName;
  	this.userPushTime = this.data.value.pushTime;
    this.id = this.data.value.id;
  }


  getValue(){
    let myDate = new Date();
    let _h = myDate.toLocaleDateString();
    let time = _h + " " + this.userPushTime;
    let myTime = this.getpushTime(time);
    let todayTime = this.getTimeOf(myTime);
    this._pushtimeservice.PushTimeEdit(this.id,todayTime)
    .subscribe(
        data => {
          if (data.code === 0) {
            this.handleEmit.emit("推送时间修改成功！");
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

  //时间选择
  date(){
    $("#patient").flatpickr({
      "locale": "zh",
      "enableTime":true,
      "noCalendar":true
    });
  }

  //提交时间转换
  getpushTime(date) { 
    var time = new Date(date.replace(/-/g, '/'));
    return time.getTime();
  }

  //判断时间大小
  getTimeOf(value){
    let _m = this.getYMD();
    let _time = _m + " " + this.userPushTime;
    let _date = this.getpushTime(_time);
    var myDate = new Date();
    var now = myDate.valueOf();
    var time = new Date(value).valueOf();
    if(now < time){
      return time;
    }else{
      return _date;
    }
  }

  //获取当前年月日
  getYMD(){
    let myDate = new Date();
    let y = myDate.getFullYear();
    let m = myDate.getMonth()+1;
    let d = myDate.getDate()+1;
    return  y + '-' + m + '-' + d;
  }

  //关闭模态框
 close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  } 

}
