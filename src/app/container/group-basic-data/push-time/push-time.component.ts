import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { PushTimeService, PushTimeTableService} from './_service';

@Component({
  selector: 'app-push-time',
  templateUrl: './push-time.component.html',
  styleUrls: ['./push-time.component.css']
})
export class PushTimeComponent implements OnInit {
	title = '基础数据维护';
  subTitle = '推送时间维护';

	pushTimeTable: TableOption = new TableOption();

	titleShow: string;
  message: string;
  enableShow: boolean;
  errorMessage:string;

	pushtime:any;
  enableEdit: boolean;

  constructor(
  	private _pushtimeservice : PushTimeService,
  	private _pushtimetableservice: PushTimeTableService
  	) { }

  ngOnInit() {
  	this.getPushTimeTitles();
  	this.getPushTime();
  }

  getPushTimeTitles(){
  	this.pushTimeTable.titles = this._pushtimetableservice.setTitles();
  }

  getPushTime(){
  	this._pushtimeservice.getPushTime().subscribe(
  			data =>{
  				this.pushTimeTable.loading = false;
  				if (data.data && data.data.length === 0 && data.code === 0) {
            this.pushTimeTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.pushTimeTable.lists = data.data;
            for (var i = 0; i < this.pushTimeTable.lists.length; ++i) {
              this.pushTimeTable.lists[i].pushTime = this.getDate(this.pushTimeTable.lists[i].pushTime);
            }
          } else {
            this.pushTimeTable.errorMessage = "空空如也～";
          }
  			},err =>{
  				this.pushTimeTable.loading = false;
          this.pushTimeTable.errorMessage = "啊哦！接口访问出错啦～";
  	})
  }
  //时间转换
  getDate(time){
    let _time = new Date(Number(time));
    var H =_time.getHours();
    var M = _time.getMinutes();
    var _H = null;
    var _M = null;
    if( H < 10 ){
      _H = "0" + H
    }else{
      _H = H; 
    };
    if( M < 10 ){
      _M = "0" + M
    }else{
      _M = M; 
    }
    let date = _H + ":" + _M
    return date;
  }

  gotoHandle(data) {
    this.pushtime = data;
    this.enableEdit = true;
  }

  refresh(){
    this.getPushTime();
  }

  handleSuccess(data){
    this.titleShow = '提示信息';
    this.message = data;
    this.enableShow = true;
    this.refresh();
  }

}
