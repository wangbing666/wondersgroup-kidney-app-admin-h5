import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import {
  PeriodStatisticsService,
  PeriodStatisticsTableService
} from './_service';

declare var $: any;
declare var flatpickr: any;

@Component({
  selector: 'period-statistics',
  templateUrl: 'period-statistics.component.html'
})
export class PeriodStatisticsComponent implements OnInit {
  title = '数据统计';
  subTitle = '活跃度统计';

  userTable: TableOption = new TableOption;
  doctorTable: TableOption = new TableOption;
  
  queryUserDate: any;
  queryDoctorDate: any;

  constructor(
    private _service: PeriodStatisticsService,
    private _tableService: PeriodStatisticsTableService
  ) {}

  ngOnInit() {
    this.defaultData();
    this.initFlatpickr();
    this.userTable.titles = this._tableService.setTitles();
    this.doctorTable.titles = this._tableService.setTitles();
  }

  //分解faltpickr形成的日期范围字符串并调用接口更新数据
  clickUserSearch(queryDate){
    let date: string[] = (<string>queryDate).split(/[ ]/);
    var start = new Date(date[0]);
    var end = new Date(date[2]);
    this.getUserQueryResult(start.valueOf(), end.valueOf());
    // console.log(start.valueOf());
    // console.log(end.valueOf());
  }

  clickDoctorSearch(queryDate){
    let date: string[] = (<string>queryDate).split(/[ ]/);
    var start = new Date(date[0]);
    var end = new Date(date[2]);
    this.getDoctorQueryResult(start.valueOf(), end.valueOf());
  }

  //计算当前时间前一周作为默认时间段调用接口并更新数据
  defaultData() {
    //计算今天前一天日期
    let date = new Date();
    date.setDate(date.getDate()-1);
    let Y = date.getFullYear().toString();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString();
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
    let oneDayBeforeToday = `${Y}-${M}-${D}`;

    //计算今天前第七天日期
    let date2 = new Date();
    date2.setDate(date2.getDate()-7);
    let Y2 = date2.getFullYear().toString();
    let M2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date.getMonth() + 1).toString();
    let D2 = (date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate()).toString();
    let sevenDaysBeforeToday = `${Y2}-${M2}-${D2}`;

    //设置日期框默认日期
    this.queryUserDate = `${sevenDaysBeforeToday} to ${oneDayBeforeToday}`;
    this.queryDoctorDate = `${sevenDaysBeforeToday} to ${oneDayBeforeToday}`;

    //调用接口更新默认数据，默认今天前第七天到今天前一天
    this.getUserQueryResult(date2.valueOf(), date.valueOf());
    this.getDoctorQueryResult(date2.valueOf(), date.valueOf());
    // console.log(date.valueOf());
    // console.log(date2.valueOf());
  }

  //初始化日期选择器Flatpickr
  initFlatpickr(){
    $("#patient").flatpickr({
      "mode": "range",
      "locale": "zh",
    });
    $("#doctor").flatpickr({
      "mode": "range",
      "locale": "zh",
    });
  }

  getUserQueryResult(start, end) {
    let option: any = { startTime: start, endTime: end};
    this._service.getUserResult(option).subscribe(data => {
      this.userTable.loading = false;
      if (data.data && data.code === 0) {
        this.userTable.lists = Array(data.data);
        // console.log(this.userTable.lists);
      } else {
        this.userTable.errorMessage = data.msg || "空空如也～";
      }
    }, err => {
      this.userTable.loading = false;
      this.userTable.errorMessage = "啊哦！接口访问出错啦～";
    })
  }

  getDoctorQueryResult(start, end) {
    let option: any = { startTime: start, endTime: end};
    this._service.getDoctorResult(option).subscribe(data => {
      this.doctorTable.loading = false;
      if (data.data && data.code === 0) {
        this.doctorTable.lists = Array(data.data);
      } else {
        this.doctorTable.errorMessage = data.msg || "空空如也～";
      }
    }, err => {
      this.doctorTable.loading = false;
      this.doctorTable.errorMessage = "啊哦！接口访问出错啦～";
    })
  }

}