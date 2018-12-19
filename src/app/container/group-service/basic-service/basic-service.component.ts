import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BasicServiceFormService, BasicServiceTableService, BasicServiceService } from './_service';
import { Observable } from 'rxjs/Observable';
import { TableOption } from '../../../entities';

@Component({
  selector: 'app-basic-service',
  templateUrl: './basic-service.component.html'
})
export class BasicServiceComponent implements OnInit {
  title ='服务维护';
  subTitle = '医生服务维护';
  
  // 医生服务列表
  basicServiceTable: TableOption = new TableOption();
  basicServiceLists: Array<any>;

  // 新建／编辑医生服务模态框选项
  modalTitle: string = '';
  status: string = '';

  enableEdit: boolean;
  basicService: any;

  // 展示信息模态框选项
  enableShow: boolean;
  titleShow: string;
  message: string;

  errorMessage: string;

  constructor(
    private _basicServiceService: BasicServiceService,
    private _basicServiceFormService: BasicServiceFormService,
    private _basicServiceTableService: BasicServiceTableService
  ) { }

  ngOnInit() {
    this.getBasicServiceTitles();
    this.getBasicServices(0);
  }

  getBasicServiceTitles(){
    this.basicServiceTable.titles = this._basicServiceTableService.setTitles();
  }

  refresh(){
    this.getBasicServices(0);
  }

  getBasicServices(page: number){
    this.basicServiceTable.currentPage = page;
    this._basicServiceService.getBasicService(page, 20)
    .subscribe(
      data => {
        if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.basicServiceTable.lists = null;
            this.basicServiceTable.errorMessage = "该数据为空哦～";
          } else if(data.data && data.data.content && data.code === 0){
          this.basicServiceTable.totalPage = data.data.totalPages;
          this.basicServiceTable.lists = data.data.content;
        } else{
            this.basicServiceTable.errorMessage = "空空如也~";
        }
      }, err => {
          this.basicServiceTable.errorMessage = "啊哦！接口访问出错啦~";
      })
  }

  gotoHandle(data){
    if(data.key == 'editBasicService'){
      this.basicService = data.value;
      this.enableEdit = true;
    }
  }

  newBasicService(){
    this.basicService = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.getBasicServices(0);
  }
}