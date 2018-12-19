import { Component, OnInit } from '@angular/core';
import { TableOption } from '../../../entities';
import { RegisterStatisticsTableService, RegisterStatisticsService } from './_service';

@Component({
  selector: 'register-statistics',
  templateUrl: 'register-statistics.component.html'
})
export class RegisterStatisticsComponent implements OnInit {
  title = '数据统计';
  subTitle = '注册量统计';

  userTable: TableOption = new TableOption();
  doctorTable: TableOption = new TableOption();

  userRegisterCount: number;

  doctorRegisterCount: number;
  doctorValidateCount: number;

  constructor(
    private _registerStatisticsService: RegisterStatisticsService,
    private _registerStatisticsTableService: RegisterStatisticsTableService
  ) {}

  ngOnInit() {
    this.getUserTitles();
    this.getDoctorTitles();
    this.getUsers(0);
    this.getDoctors(0);
  }

  getUserTitles() {
    this.userTable.titles = this._registerStatisticsTableService.setUserTitles();
  }

  getDoctorTitles() {
    this.doctorTable.titles = this._registerStatisticsTableService.setDoctorTitles();
  }

  refresh(){
    this.getUsers(0);
    this.getDoctors(0);
  }

  getUsers(page: number) {
    this.userTable.currentPage = page;
    this._registerStatisticsService.getUsers(page, this.userTable.size)
      .subscribe(
        data => {
          this.userTable.loading = false;
          if (data.data && data.data.userRegisterList && data.code === 0) {
            this.userTable.totalPage = data.data.userRegisterList.totalPages;
            this.userTable.lists = data.data.userRegisterList.content;
            this.userRegisterCount = data.data.count;
          }else {
            this.userTable.errorMessage = data.msg || "空空如也～";
          }
        }, err => {
          this.userTable.loading = false;
          this.userTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getDoctors(page: number) {
    this.doctorTable.currentPage = page;
    this._registerStatisticsService.getDoctors(page, this.doctorTable.size)
      .subscribe(
        data => {
          this.doctorTable.loading = false;
          if (data.data && data.data.doctorRegisters && data.code === 0) {
            this.doctorTable.totalPage = data.data.doctorRegisters.totalPages;
            this.doctorTable.lists = data.data.doctorRegisters.content;
            this.doctorRegisterCount = data.data.count;
            this.doctorValidateCount = data.data.accessCount;
          }else {
            this.doctorTable.errorMessage = data.msg || "空空如也～";
          }
        }, err => {
          this.doctorTable.loading = false;
          this.doctorTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }
}