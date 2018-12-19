import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import {
  ServiceStatisticsService,
  ServiceStatisticsTableService
} from './_service';

declare var $: any;
declare var flatpickr: any;

@Component({
  selector: 'service-statistics',
  templateUrl: 'service-statistics.component.html'
})
export class ServiceStatisticsComponent implements OnInit {
  title = '数据统计';
  subTitle = '服务数据统计';

  dataTable: TableOption;

  userStatistics: any;

  queryDate: any; 

  judge: boolean = false;//用来判断总数据那一块

  constructor(
    private _service: ServiceStatisticsService,
    private _tableService: ServiceStatisticsTableService
  ) {}

  ngOnInit() {
    this.refresh();
    this.date();
  }

  refresh() {
    let date = new Date();
    let Y = date.getFullYear().toString();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString();
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
    this.queryDate = `${Y}-${M}-${D}`;
    this.defaultData();
  }

  reset() {
    this.queryDate = null;
    this.defaultData();
  }
  //时间选择
  date(){
    $("#patient").flatpickr({
      "mode" : "range",
      "locale": "zh",
    });
  }

  getTitles() {
    this.dataTable.titles = this._tableService.setTitles();
  }

  defaultData(){
    //计算今天前一天日期
    let date = new Date();
    date.setDate(date.getDate()-1);
    let Y = date.getFullYear().toString();
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    let oneDayBeforeToday = `${Y}-${M}-${D}`;

    //计算今天前第七天日期
    let date2 = new Date();
    date2.setDate(date2.getDate()-7);
    let Y2 = date2.getFullYear().toString();
    let M2 = date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : (date.getMonth() + 1).toString();
    let D2 = date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate().toString();
    let sevenDaysBeforeToday = `${Y2}-${M2}-${D2}`;

    //设置日期框默认日期
    this.queryDate = `${sevenDaysBeforeToday} to ${oneDayBeforeToday}`;
    

    //调用接口更新默认数据，默认今天前第七天到今天前一天
    this.searchData(date2.valueOf(), date.valueOf());
  }

  searchData(start, end) {
    this.dataTable = new TableOption();
    this.userStatistics = null;
    this.getTitles();
    let option: any = { startTime: start, endTime: end };
    if (this.queryDate) {
      option.date = this.queryDate;
    }
    this._service.getData(option)
      .subscribe(
        data => {
          this.dataTable.loading = false;
          if (data.data && data.data.serviceStatisticsList && data.data.serviceStatisticsList.length === 0 && data.code === 0) {
            this.dataTable.errorMessage = "当前数据为空哦～";
          } else if (data.data && data.data.serviceStatisticsList && data.code === 0) {
            console.log(data.data);
            this.judge = true;
            this.dataTable.lists = data.data.serviceStatisticsList;
            this.userStatistics = {};
            this.userStatistics.accessRatio = data.data.accessRatio || "0";
            this.userStatistics.allAccessCount = data.data.allAccessCount || "0";
            this.userStatistics.allApplyCount = data.data.allApplyCount || "0";
            this.userStatistics.allEffectiveServiceCount = data.data.allEffectiveServiceCount || "0";
            this.userStatistics.allUsedQuestionCount = data.data.allUsedQuestionCount || "0";
            this.userStatistics.applyRatio = data.data.applyRatio || "0";
            this.userStatistics.connectRatio = data.data.connectRatio || "0";
            this.userStatistics.usedQuestionRatio = data.data.usedQuestionRatio || "0";
            // console.log(this.userStatistics);
          } else {
            this.dataTable.errorMessage = data.msg || "空空如也～";
          }
        }, err => {
          this.dataTable.loading = false;
          this.dataTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  //分解faltpickr形成的日期范围字符串并调用接口更新数据
  clickSearch(){
    this.judge = false;
    let date: string[] = (<string>this.queryDate).split(/[ ]/);
    var start = new Date(date[0]);
    var end = new Date(date[2]);
    this.searchData(start.valueOf(), end.valueOf());
  }

}
