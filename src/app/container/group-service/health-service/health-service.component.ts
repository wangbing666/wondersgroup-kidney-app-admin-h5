import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';


import { HealthServiceService, HealthServiceTableService ,HealthServiceFormService} from './_service';

@Component({
  selector: 'app-health-service',
  templateUrl: './health-service.component.html'
})
export class HealthServiceComponent implements OnInit {

  title = '第三方服务维护';
  subTitle = '第三方服务列表';
  loading: boolean = true;

  HealthServiceTable: TableOption = new TableOption();

  // 展示信息模态框选项
  enableShow: boolean = false;
  message: string;
  errorMessage:string;
 
  
  enableEdit: boolean = false;
  HealthService: any;


  constructor(
    private _healthserviceService: HealthServiceService,
    private _healthserviceFormService: HealthServiceFormService,
    private _healthserviceTableService: HealthServiceTableService
  ) { }

  ngOnInit() { 
    this.getHealthServiceTitles();
    this.getHealthServices(0);
  }

  getHealthServiceTitles(){
    this.HealthServiceTable.titles = this._healthserviceTableService.setTitles();
  }

  getHealthServices(page: number){
    this.HealthServiceTable.currentPage = page;
    this._healthserviceService.getHealthServices(page, this.HealthServiceTable.size)
      .subscribe(
        data => {
          this.HealthServiceTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.HealthServiceTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.HealthServiceTable.totalPage = data.data.totalPages;
            this.HealthServiceTable.lists = data.data.content;
            for (let i = 0; i < this.HealthServiceTable.lists.length;i++) {
              this.HealthServiceTable.lists[i].enabled = this.getEnabled(this.HealthServiceTable.lists[i].enabled);
            }
          } else {
            this.HealthServiceTable.errorMessage = "空空如也～";
          }
        },err => {
           this.HealthServiceTable.loading = false;
           this.HealthServiceTable.errorMessage = "啊哦！接口访问出错啦～";
      })
  }

  gotoHandle(data){
    if (data.key == 'edit') {
      this.HealthService = data.value;
      this.enableEdit = true;
    } 
  }

  newHealthService(){
    this.HealthService = new Array();
    this.enableEdit = true;
  }

  refresh() {
    this.getHealthServices(0);
  }

  getEnabled(enabled){
    if(enabled === false) {
      return '禁用';
    }
    if(enabled === true) {
      return '启用';
    }
    return null;
  }

 handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    if(data == "修改成功！"){
      this.getHealthServices(this.HealthServiceTable.currentPage);
    }else if(data == "添加成功！"){
      this.getHealthServices(0);
    }
  }
}

