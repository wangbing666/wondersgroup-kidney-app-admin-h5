import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';
import { Observable } from 'rxjs/Observable';
import { DrugService, DrugTableService, DrugFormService } from './_service';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html'
})
export class DrugComponent implements OnInit {
  title = '基础数据维护';
  subTitle = '药品数据维护';

  // 药品数据维护列表
  drugTable: TableOption = new TableOption();
  drugLists: Array<any>;

  // 新建／编辑药品数据维护模态框选项
  modalTitle: string = '';
  status: string = '';

  enableEdit: boolean;
  drug: any;

  // 展示信息模态框选项
  enableShow: boolean;
  titleShow: string;
  message: string;

  errorMessage: string;

  constructor(
    private _drugService: DrugService,
    private _drugTableService: DrugTableService
  ) {}

  ngOnInit() {
    this.getDrugTitles();
    this.getDrugs(0);
  }

  getDrugTitles(){
    this.drugTable.titles = this._drugTableService.setDrugTitles();
  }

   refresh() {
    this.getDrugs(0);
  }

  getDrugs(page: number){
    this.drugTable.currentPage = page;
    this._drugService.getDrugs(page, 20)
    .subscribe(
      data => {
        // console.log(data);
         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.drugTable.lists = null;
            this.drugTable.errorMessage = "该数据为空哦～";
          } else if(data.data && data.data.content && data.code === 0){
          this.drugTable.totalPage = data.data.totalPages;
          this.drugTable.lists = data.data.content;
          // console.log(data.data.content);
        } else {
            this.drugTable.lists = null;
            this.drugTable.errorMessage = "啊哦！没有接收到数据哎～";
          }
      }, err => {
          this.drugTable.errorMessage = "啊哦！接口访问出错啦~";
      })
  }

  gotoHandle(data){
    if(data.key == 'editDrug'){
      this.drug = data.value;
      // console.log(this.drug);
      this.enableEdit = true;
    }
  }

  newDrug(){
    this.drug = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.getDrugs(0);
  }
}
