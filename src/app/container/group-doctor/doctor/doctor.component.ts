import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { DoctorService, DoctorTableService } from './_service';
import { SidebarService } from '../../../services';

declare var $:any;
declare var ExcellentExport:any;

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit {
  title = '医生信息管理';
  subTitle = '医生信息列表';
  loading: boolean = true;

  auditedTable: TableOption;
  auditingTable: TableOption;
  doctorViaTable: TableOption;
  failureTable: TableOption;

  count: number;

  doctor: any;
  enableEdit: boolean;

  imgUrls: Array < any > ;
  enableImg: boolean;

  titleShow: string;
  message: string;
  enableShow: boolean;

  totalElements:any;

  integral:any;
  enableDetail:any;

  errorMessage: string;

  enableProcess: boolean;
  processMessage: string;
  processData: any;

  enableMessage: boolean;

  constructor(
    private _doctorService: DoctorService,
    private _doctorTableService: DoctorTableService,
    private _sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.refresh();
    this.getAuditedTitles();
  }

  refresh() {
    this.auditedTable = new TableOption();
    this.auditingTable = new TableOption();
    this.doctorViaTable = new TableOption();
    this.failureTable = new TableOption();
    this.getAuditedTitles();
    this.getAuditingTitles();
    this.getFailureTitles();
    this.getAuditedDoctors(0);
    this.getAuditingDoctors(0);
    this.getFailureDoctors(0);
    this.doctorExcel();
  }

  getAuditedTitles() {
    this.auditedTable.titles = this._doctorTableService.setDoctorAuditedTitles();
  }

  getAuditingTitles() {
    this.auditingTable.titles = this._doctorTableService.setDoctorAuditingTitles();
  }

  getFailureTitles() {
    this.failureTable.titles = this._doctorTableService.setDoctorFailureTitles();
  }

  getAuditedDoctors(page: number) {
    this.auditedTable.currentPage = page;
    this._doctorService.getAuditedDoctors(page, this.auditedTable.size)
      .subscribe(
        data => {
          this.auditedTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.auditedTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.auditedTable.totalPage = data.data.totalPages;
            this.totalElements = data.data.totalElements;
            this.auditedTable.lists = data.data.content;
            this.doctorVia(this.totalElements);
          } else {
            this.auditedTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.auditedTable.loading = false;
          this.auditedTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getAuditingDoctors(page: number) {
    this.auditingTable.currentPage = page;
    this._doctorService.getAuditingDoctors(page, this.auditingTable.size)
      .subscribe(
        data => {
          this.auditingTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.auditingTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.auditingTable.totalPage = data.data.totalPages;
            this.auditingTable.lists = data.data.content;
            this.count = data.data.content.length;
            this._sidebarService.setCount(this.count, 'doctorgroup', 'doctor');
          } else {
            this.auditingTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.auditingTable.loading = false;
          this.auditingTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getFailureDoctors(page: number) {
    this.failureTable.currentPage = page;
    this._doctorService.getFailureDoctors(page, this.failureTable.size)
      .subscribe(
        data => {
          this.failureTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.failureTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.failureTable.totalPage = data.data.totalPages;
            this.failureTable.lists = data.data.content;
          } else {
            this.failureTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.failureTable.loading = false;
          this.failureTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getTitleImg(id) {
    this._doctorService.getTitleImg(id)
      .subscribe(
        data => {
          if (data.data && data.data.length === 0 && data.code === 0) {
            this.titleShow = '提示信息';
            this.message = '该用户未上传照片';
            this.enableShow = true;
          } else if (data.data && data.code === 0) {
            this.imgUrls = [];
            data.data.forEach(obj => {
              this.imgUrls.push(obj.img);
            })
            this.enableImg = true;
          } else {
            if (data.msg) {
              this.message = data.msg;
            } else {
              this.message = '获取图片出错';
            }
            this.titleShow = '提示信息';
            this.enableShow = true;
          }
        }, err => {
          this.titleShow = '提示信息';
          this.message = '获取图片出错';
          this.enableShow = true;
        })
  }

  gotoHandle(data) {
    if (data.key === 'certification') {
      this.getTitleImg(data.value.id);
    } else if (data.key === 'edit') {
      this.doctor = data;
      this.enableEdit = true;
    } else if (data.key === 'failureEdit') {
      this._doctorService.getTitleImg(data.value.id)
        .subscribe(
          img => {
            if (img.code === 0) {
              if (img.data && img.data[0]) {
                data.value.doctorTitleImg = img.data[0].img;
              }
              this.doctor = data;
              this.enableEdit = true;
            }
          })
    } else if (data.key === 'refuseCause') {
      this.titleShow = '拒绝理由';
      this.message = data.value.refuseCause || '无';
      this.enableShow = true;
    } else if (data.key === 'assess') {
      this.processData = data;
      this.processMessage = '你确定通过审核？';
      this.enableProcess = true;
    } else if (data.key === 'refuse') {
      this.processData = data;
      this.processMessage = '你确定拒绝审核？';
      this.enableProcess = true;
    } else if(data.key === 'point'){
      this.integral = data;
      this.enableDetail = true;
    }
  }

  newDoctor() {
    this.doctor = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.titleShow = '提示信息';
    this.message = data;
    this.enableShow = true;
    this.refresh();
  }

  process() {
    if (this.processData.key === 'assess') {
      this._doctorService.doctorAuditingSuccess(this.processData.value.id)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.refresh();
              this.titleShow = '提示信息';
              this.message = '通过审核成功！';
              this.enableShow = true;
              this.processCancel();
            } else {
              if (data.msg) {
                this.message = data.msg;
              } else {
                this.message = '审核失败，请重新操作！';
              }
              this.titleShow = '提示信息';
              this.enableShow = true;
              this.processCancel();
            }
          }, err => {
            this.titleShow = '提示信息';
            this.message = '审核失败，请重新操作！';
            this.enableShow = true;
            this.processCancel();
          })
    }
  }

  processF(value) {
    if (this.processData && this.processData.key === 'refuse') {
      this._doctorService.doctorAuditingFailure(this.processData.value.id, value.reason)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.refresh();
              this.titleShow = '提示信息';
              this.message = '拒绝审核成功！';
              this.enableShow = true;
              this.processCancel();
            } else {
              if (data.msg) {
                this.message = data.msg;
              } else {
                this.message = '审核失败，请重新操作！';
              }
              this.titleShow = '提示信息';
              this.enableShow = true;
              this.processCancel();
            }
          }, err => {
            this.titleShow = '提示信息';
            this.message = '审核失败，请重新操作！';
            this.enableShow = true;
            this.processCancel();
          })
    }
  }

  processCancel() {
    this.processData = null;
    this.processMessage = '';
    this.enableProcess = false;
  }

  //打印excel;
  doctorVia(data){
    this._doctorService.getAuditedDoctors(0,data)
      .subscribe(
        data => {
          this.doctorViaTable.lists = data.data.content;
        })
  }

  doctorExcel(){
    $('.doctorExcel').on('click', function(){
        let myDate = new Date();
        let $this = $(this);
        let table = $("#doctortable")[0];
        $this.attr('download', '全程心管家医生信息列表-'+myDate.toLocaleDateString()+'.xls');
        ExcellentExport.excel(this, table);
    });
  }


  msgSend() {
    this.enableMessage = true;
  }

}
