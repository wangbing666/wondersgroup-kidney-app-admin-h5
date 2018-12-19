import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { IntegralDetailService, IntegralDetailTableService } from './_service';

@Component({
  selector: 'integral-detail',
  templateUrl: 'integral-detail.component.html'
})
export class IntegralDetailComponent implements OnInit {
  title = '积分管理';
  subTitle = '积分明细';

  userIntegralDetailTable: TableOption;
  doctorIntegralDetailTable: TableOption;

  userIntegralDetail: any;
  doctorIntegralDetail: any;

  queryKeyUser: string;
  queryKeyDoctor: string;

  isSearch: boolean;

  constructor(
    private _integralDetailService: IntegralDetailService,
    private _integralDetailTableService: IntegralDetailTableService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.getUserIntegralDetail(0);
    this.getDoctorIntegralDetail(0);
  }

  reset() {
    this.queryKeyUser = null;
    this.queryKeyDoctor = null;
    this.getUserIntegralDetail(0);
    this.getDoctorIntegralDetail(0);
  }

  getUserIntegralTitles() {
    this.userIntegralDetailTable.titles = this._integralDetailTableService.setTitles();
  }

  getDoctorIntegralTitles() {
    this.doctorIntegralDetailTable.titles = this._integralDetailTableService.setTitles();
  }

  getUserIntegralDetail(page: number) {
    this.isSearch = false;
    this.queryKeyUser = null;
    this.userIntegralDetailTable = new TableOption();
    this.userIntegralDetail = null;
    this.getUserIntegralTitles();
    this.userIntegralDetailTable.currentPage = page;
    this._integralDetailService.getIntegralDetail(0, 20, page)
      .subscribe(
        data => {
          this.userIntegralDetailTable.loading = false;
          if (data.data  && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userIntegralDetailTable.errorMessage = "当前数据为空哦～";
          } else if (data.data  && data.data.content && data.code === 0) {
            this.userIntegralDetailTable.totalPage = data.data.totalPages;
            this.userIntegralDetailTable.lists = data.data.content;
            if (data.data.content) {
              this.userIntegralDetailTable.lists = data.data.content;
              // console.log(data.data.content);
            }
          } else {
            this.userIntegralDetailTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.userIntegralDetailTable.loading = false;
          this.userIntegralDetailTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getDoctorIntegralDetail(page: number) {
    this.queryKeyDoctor = null;
    this.isSearch = false;
    this.doctorIntegralDetailTable = new TableOption();
    this.doctorIntegralDetail = null;
    this.getDoctorIntegralTitles();
    this.doctorIntegralDetailTable.currentPage = page;
    this._integralDetailService.getIntegralDetail(1, 20, page)
      .subscribe(
        data => {
          this.doctorIntegralDetailTable.loading = false;
          if (data.data  && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.doctorIntegralDetailTable.errorMessage = "当前数据为空哦～";
          } else if (data.data  && data.data.content && data.code === 0) {
            this.doctorIntegralDetailTable.totalPage = data.data.totalPages;
            this.doctorIntegralDetailTable.lists = data.data.content;
            if (data.data.content) {
              this.doctorIntegralDetailTable.lists = data.data.content;
              // console.log(data.data.content);
            }
          } else {
            this.doctorIntegralDetailTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.doctorIntegralDetailTable.loading = false;
          this.doctorIntegralDetailTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getUserSearch(){
    this.isSearch = true;
    this.userIntegralDetailTable = new TableOption();
    this.userIntegralDetail = null;
    this.getUserIntegralTitles();
    this._integralDetailService.getSearch(0, this.queryKeyUser)
      .subscribe(
        data => {
          this.userIntegralDetailTable.loading = false;
          if (data.data && data.data.length === 0 && data.code === 0) {
            this.userIntegralDetailTable.errorMessage = "当前数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.userIntegralDetailTable.lists = data.data;
          } else {
            this.userIntegralDetailTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.userIntegralDetailTable.loading = false;
          this.userIntegralDetailTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

    getDoctorSearch(){
        this.isSearch = true;
        this.doctorIntegralDetailTable = new TableOption();
        this.doctorIntegralDetail = null;
        this.getDoctorIntegralTitles();
        this._integralDetailService.getSearch(1, this.queryKeyDoctor)
        .subscribe(
        data => {
          this.doctorIntegralDetailTable.loading = false;
          if (data.data && data.data.length === 0 && data.code === 0) {
            this.doctorIntegralDetailTable.errorMessage = "当前数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.doctorIntegralDetailTable.lists = data.data;
          } else {
            this.doctorIntegralDetailTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.doctorIntegralDetailTable.loading = false;
          this.doctorIntegralDetailTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }


}
