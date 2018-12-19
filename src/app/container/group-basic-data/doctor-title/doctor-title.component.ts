import { Component, OnInit} from '@angular/core';

import { TableOption } from '../../../entities';

import { DoctorTitleFormService, DoctorTitleService,DoctorTitleTableService } from './_service';


@Component({
  selector: 'app-doctor-title',
  templateUrl: './doctor-title.component.html'
})
export class DoctorTitleComponent implements OnInit {

  title = '基础数据维护';
  subTitle = '职称数据维护';
  status: string = '';
  enableEdit: boolean = false;
  doctortitle: any;
  loading: boolean = true;

  // 展示信息模态框选项
  enableShow: boolean = false;
  message: string;
  errorMessage:string;

   // 删除模态框选项
  Id: number;
  enableAudit:boolean = false;

  titleTable: TableOption = new TableOption();


  constructor(
  	private _doctortitleService: DoctorTitleService,
    private _doctortitleFormService: DoctorTitleFormService,
    private _doctortitleTableService: DoctorTitleTableService,
  	) { }

  ngOnInit() {
  	this.getDoctorTitleTitles();
    this.getDoctorTitles();
  }

   getDoctorTitleTitles(){
    this.titleTable.titles = this._doctortitleTableService.DoctorTitleTitles();
  }

  refresh() {
    this.getDoctorTitles();
  }

  getDoctorTitles(){
    this._doctortitleService.getDoctorTitle()
    .subscribe(
      data => {
         this.titleTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.titleTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.titleTable.totalPage = data.data.totalPages;
            this.titleTable.lists = data.data.content;
          } else {
            this.titleTable.errorMessage = "空空如也～";
          }
      },err =>{
        this.titleTable.loading = false;
        this.titleTable.errorMessage = "啊哦！接口访问出错啦～";
    })
	}

  gotoHandle(data){
    if (data.key == 'editPositionalTitle') {
      this.doctortitle = data.value;
      this.enableEdit = true;
    }
    if(data.key == 'deletePositionalTitle'){
      this.Id = data.value.id;
      this.enableAudit = true;
    }
  }



   refund(target) {
    if (this.Id) {
      this._doctortitleService.DoctorTitleDelete(this.Id)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.message = "删除成功～";
              this.enableAudit = false;
              this.enableShow = true;
              this.getDoctorTitles();
            } else {
              this.message = "删除失败～请重新操作！";
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
  
  newTitle(){
    this.doctortitle = '';
    this.status = 'create';
    this.enableEdit = true;
  }


  handleSuccess(data) {
    this.getDoctorTitles();
    this.message = data;
    this.enableShow = true;
  }

}