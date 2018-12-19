import { Component, OnInit} from '@angular/core';

import { TableOption } from '../../../entities';

import { DoctorServiceFormService, DoctorServiceService, DoctorServiceTableService} from './_service';
import { SidebarService} from '../../../services';


@Component({
  selector: 'app-doctor-service',
  templateUrl: './doctor-service.component.html'
})
export class DoctorServiceComponent implements OnInit {

  title = '医生服务管理';
  subTitle = '医生服务列表';
  loading: boolean = true;

  allTable: TableOption = new TableOption();
  auditingTable: TableOption = new TableOption();

  count: number;

  doctorservice: any;
  enableEdit: boolean = false;

  // 展示信息模态框选项
  enableShow: boolean = false;
  message: string;
  errorMessage:string;

  // 审核通过模态框选项
  groupId: number;
  enableAudit:boolean = false;

  constructor(
  	private _doctorGroupService: DoctorServiceService,
    private _doctorGroupFormService: DoctorServiceFormService,
    private _doctorGroupTableService: DoctorServiceTableService,
    private _sidebarService: SidebarService
  	) { }

  ngOnInit() {
    this.getDoctorGroupTitles();
    this.getAuditingServiceTitles();
    this.getDoctorGroups(0);
    this.getAuditingServices(0);
  }


  getDoctorGroupTitles(){
    this.allTable.titles = this._doctorGroupTableService.setDoctorallTitles();
  }

  refresh() {
    this.getDoctorGroups(0);
    this.getAuditingServices(0);
  }

  getDoctorGroups(page: number){
    this.allTable.currentPage = page;
    this._doctorGroupService.getDoctorGroups(page, 10)
      .subscribe(
        data => {
          this.allTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.allTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.allTable.totalPage = data.data.totalPages;
            this.allTable.lists = data.data.content;
          } else {
            this.allTable.errorMessage = "空空如也～";
          }
        },err => {
          this.allTable.loading = false;
          this.allTable.errorMessage = "啊哦！接口访问出错啦～";
        })
      }

  getAuditingServiceTitles(){
    this.auditingTable.titles = this._doctorGroupTableService.setDoctorAuditingTitles();
  }

  getAuditingServices(page: number){
    this.auditingTable.currentPage = page;
    this._doctorGroupService.getAuditingServices(page, 10)
      .subscribe(
        data => {
          this.auditingTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.auditingTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.count = data.data.totalElements;
            this.auditingTable.totalPage = data.data.totalPages;
            this.auditingTable.lists = data.data.content;
            this._sidebarService.setCount(this.count, 'doctorgroup', 'doctorservice');
            for (let i = 0; i < this.auditingTable.lists.length;i++) {
                this.auditingTable.lists[i].audit = "操作";
             };
          } else {
            this.auditingTable.errorMessage = "空空如也～";
          }
        },err => {
          this.auditingTable.loading = false;
          this.auditingTable.errorMessage = "啊哦！接口访问出错啦～";
        })
      }


 gotoHandle(data){
    if (data.key == 'edit') {
      this.doctorservice = data.value;
      this.enableEdit = true;
    } 
    if(data.key == 'audit'){
      this.groupId = data.value.id;
      this.enableAudit = true;
    }
  }

  refund(target) {
    if (this.groupId) {
      this._doctorGroupService.serviceAuditingSuccess(this.groupId,target)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.message = "操作成功～";
              this.enableAudit = false;
              this.enableShow = true;
              this.refresh();
            } else {
              this.enableAudit = false;
              this.enableShow = true;
            }
          },err => {
            this.message = "连接服务器出错";
            this.enableAudit = false;
            this.enableShow = true;
          })
       }
  }

  refundCancel() {
    this.enableAudit = false;
  }

}