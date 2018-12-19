import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';
import { Observable } from 'rxjs/Observable';
import { HospitalService, HospitalFormService, HospitalTableService } from './_service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html'
})
export class HospitalComponent implements OnInit {
  title = '基础数据维护';
  subTitle = '医院数据维护';

  // 医院数据维护列表
  hospitalTable: TableOption = new TableOption();
  hospitalLists: Array<any>;

  // 新建／编辑医院数据维护模态框选项
  modalTitle: string = '';
  status: string = '';
  enableEdit: boolean;
  hospital: any;

  // 展示信息模态框选项
  enableShow: boolean;
  titleShow: string;
  message: string;

  errorMessage: string;

  constructor(
    private _hospitalService: HospitalService,
    private _hospitalFormService: HospitalFormService,
    private _hospitalTableService: HospitalTableService
  ) {}

  ngOnInit() {
    this.getHospitalTitles();
    this.getHospitals(0);
  }

  getHospitalTitles(){
    this.hospitalTable.titles = this._hospitalTableService.setHospitalTitles();
  }

  refresh(){
    this.getHospitals(0);
  }
  
  getHospitals(page: number){
    this.hospitalTable.currentPage = page;
    this._hospitalService.getHospital(page, 20)
    .subscribe(
      data => {
        if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.hospitalTable.errorMessage = "该数据为空哦～";
          } else if(data.data && data.data.content && data.code === 0){
          this.hospitalTable.totalPage = data.data.totalPages;
          this.hospitalTable.lists = data.data.content;
        } else {
            this.hospitalTable.errorMessage = "空空如也～";
          }
      }, err => {
          this.hospitalTable.errorMessage = "啊哦！接口访问出错啦~";
      })
  }

  gotoHandle(data){
    if(data.key == 'editHospital'){
      this.hospital = data.value;
      this.enableEdit = true;
    }
  }

  newHospital(){
    this.hospital = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.getHospitals(0);
  }
}
