import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import {
  ActivenessStatisticsService,
  ActivenessStatisticsTableService
} from './_service';

declare var $: any;
declare var flatpickr: any;

@Component({
  selector: 'activeness-statistics',
  templateUrl: 'activeness-statistics.component.html'
})
export class ActivenessStatisticsComponent implements OnInit {
  title = '数据统计';
  subTitle = '日活跃度统计';

  userActivenessTable: TableOption;
  doctorActivenessTable: TableOption;

  userStatistics: any;
  doctorStatistics: any;

  queryUserKey: string;
  queryUserDate: any;
  queryDoctorKey: string;
  queryDoctorDate: any;

  constructor(
    private _activenessStatisticsService: ActivenessStatisticsService,
    private _activenessStatisticsTableService: ActivenessStatisticsTableService
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
    this.queryUserDate = `${Y}-${M}-${D}`;
    this.queryDoctorDate = `${Y}-${M}-${D}`;
    this.getUserActivenessStatistics(0);
    this.getDoctorActivenessStatistics(0);
  }

  resetUser() {
    this.queryUserKey = null;
    this.queryUserDate = null;
    this.getUserActivenessStatistics(0);
  }
  //时间选择
  date(){
    $("#patient").flatpickr({
      "locale": "zh",
    });
    $("#doctor").flatpickr({
      "locale": "zh",
    });
  }

  resetDoctor() {
    this.queryDoctorKey = null;
    this.queryDoctorDate = null;
    this.getDoctorActivenessStatistics(0);
  }

  getUserActivenessTitles() {
    this.userActivenessTable.titles = this._activenessStatisticsTableService.setUserTitles();
  }

  getDoctorActivenessTitles() {
    this.doctorActivenessTable.titles = this._activenessStatisticsTableService.setDoctorTitles();
  }

  getUserActivenessStatistics(page: number) {
    this.userActivenessTable = new TableOption();
    this.userStatistics = null;
    this.getUserActivenessTitles();
    this.userActivenessTable.currentPage = page;
    let option: any = { page: page };
    if (this.queryUserKey) {
      option.key = this.queryUserKey;
    }
    if (this.queryUserDate) {
      option.date = this.queryUserDate;
    }
    this._activenessStatisticsService.getUserActiveness(option)
      .subscribe(
        data => {
          this.userActivenessTable.loading = false;
          if (data.data && data.data.dtos && data.data.dtos.length === 0 && data.code === 0) {
            this.userActivenessTable.errorMessage = "当前数据为空哦～";
          } else if (data.data && data.data.dtos && data.code === 0) {
            this.userActivenessTable.currentPage = page;
            this.userActivenessTable.totalPage = data.data.totalPage;
            this.userActivenessTable.lists = data.data.dtos;
            this.userStatistics = {};
            this.userStatistics.loginTotal = data.data.total;
            this.userStatistics.loginCount = data.data.num;
            this.userStatistics.loginRate = data.data.ratio;
            this.userStatistics.loginAverage = data.data.average;
          } else {
            this.userActivenessTable.errorMessage = data.msg || "空空如也～";
          }
        }, err => {
          this.userActivenessTable.loading = false;
          this.userActivenessTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getDoctorActivenessStatistics(page: number) {
    this.doctorActivenessTable = new TableOption();
    this.doctorStatistics = null;
    this.getDoctorActivenessTitles();
    this.doctorActivenessTable.currentPage = page;
    let option: any = { page: page };
    if (this.queryDoctorKey) {
      option.key = this.queryDoctorKey;
    }
    if (this.queryDoctorDate) {
      option.date = this.queryDoctorDate;
    }
    this._activenessStatisticsService.getDoctorActiveness(option)
      .subscribe(
        data => {
          this.doctorActivenessTable.loading = false;
          if (data.data && data.data.dtos && data.data.dtos.length === 0 && data.code === 0) {
            this.doctorActivenessTable.errorMessage = "当前数据为空哦～";
          } else if (data.data && data.data.dtos && data.code === 0) {
            this.doctorActivenessTable.currentPage = page;
            this.doctorActivenessTable.totalPage = data.data.totalPage;
            this.doctorActivenessTable.lists = data.data.dtos;
            this.doctorStatistics = {};
            this.doctorStatistics.loginTotal = data.data.total;
            this.doctorStatistics.loginCount = data.data.num;
            this.doctorStatistics.loginRate = data.data.ratio;
            this.doctorStatistics.loginAverage = data.data.average;
            
          } else {
            this.doctorActivenessTable.errorMessage = data.msg || "空空如也～";
          }
        }, err => {
          this.doctorActivenessTable.loading = false;
          this.doctorActivenessTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

}
