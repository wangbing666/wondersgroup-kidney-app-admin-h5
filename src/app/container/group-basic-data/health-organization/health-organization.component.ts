import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';
import { Observable } from 'rxjs/Observable';
import { HealthService, HealthTableService, HealthFormService} from './_service';

@Component({
  selector: 'app-health-organization',
  templateUrl: './health-organization.component.html'
})
export class HealthComponent implements OnInit {
  title = '基础数据维护';
  subTitle = '第三方机构维护';

  // 第三方机构维护列表
  healthTable: TableOption = new TableOption();
  healthLists: Array<any>;

  // 新建／编辑第三方机构维护模态框选项
  modalTitle: string = '';
  status: string = '';
  enableEdit: boolean;
  health: any;

  // 展示信息模态框选项
  enableShow: boolean;
  titleShow: string;
  message: string;

  errorMessage: string;

  constructor(
    private _healthService: HealthService,
    private _healthFormService: HealthFormService,
    private _healthTableService: HealthTableService
  ) {}

  ngOnInit() {
    this.getHealthTitles();
    this.getHealths(0);
  }

  getHealthTitles(){
    this.healthTable.titles = this._healthTableService.setThirdPartyTitles();
  }

   refresh(){
    this.getHealths(0);
  }

  getHealths(page: number){
    this.healthTable.currentPage = page;
    this._healthService.getThirdParty(page, 20)
    .subscribe(
      data => {
        if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.healthTable.errorMessage = "该数据为空哦～";
          } else if(data.data && data.data.content && data.code === 0){
          this.healthTable.totalPage = data.data.totalPages;
          this.healthTable.lists = data.data.content;
        } else {
            this.healthTable.lists = null;
            this.healthTable.errorMessage = "啊哦！没有接收到数据哎～";
          }
      }, err => {
          this.healthTable.errorMessage = "啊哦！接口访问出错啦~";
      })
  }

  gotoHandle(data){
    if(data.key == 'editThirdParty'){
      this.health = data.value;
      this.enableEdit = true;
    }
    
  }

  newHealth(){
    this.health = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.getHealths(0);
  }
}
