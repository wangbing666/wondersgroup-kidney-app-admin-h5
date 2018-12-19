import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { InspectionCategoryService, InspectionCategoryTableService } from './_service';

@Component({
  selector: 'app-inspection-category',
  templateUrl: 'inspection-category.component.html'
})
export class InspectionCategoryComponent implements OnInit {

  title = '检查类目维护';
  subTitle = '检查类目维护列表';

  inspectionCategoryTable: TableOption;

  inspectionCategoryData: any;
  enableEdit: boolean;

  message: string;
  enableShow: boolean;

  constructor(
    private _inspectionCategoryService: InspectionCategoryService,
    private _inspectionCategoryTableService: InspectionCategoryTableService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.inspectionCategoryTable = new TableOption();
    this.getInspectionCategoryTitles();
    this.getInspectionCategories();
  }

  getInspectionCategoryTitles() {
    this.inspectionCategoryTable.titles = this._inspectionCategoryTableService.setTitles();
  }

  getInspectionCategories() {
    this._inspectionCategoryService.getInspectionCategories()
      .subscribe(
         res => {
           this.inspectionCategoryTable.loading = false;
           if (res.code === 0 && res.data && res.data.length === 0) {
             this.inspectionCategoryTable.errorMessage = '该数据为空哦～';
           } else if (res.code === 0 && res.data) {
             this.inspectionCategoryTable.lists = res.data;
           } else {
             this.inspectionCategoryTable.errorMessage = '空空如也～';
           }
         }, err => {
           this.inspectionCategoryTable.loading = false;
           this.inspectionCategoryTable.errorMessage = '啊哦！接口访问出错啦～';
         }
      )
  }

  gotoHandle(data) {
    if (data.key === 'edit') {
      this.inspectionCategoryData = data.value;
      this.enableEdit = true;
    }

    if (data.key === 'delete') {
      // console.log(data.value);
      this._inspectionCategoryService.inspectionCategoryDelete(data.value.id)
        .subscribe(
          res => {
            if (res.code === 0) {
              this.message = '检查类目删除成功！';
              this.enableShow = true;
              this.refresh();
            } else {
              if(res.msg) {
                this.message = res.msg;
              } else {
                this.message = "检查类目删除失败！";
              }
              this.enableShow = true;
            }
          }, err => {
            this.message = "啊哦！接口访问出错啦～";
            this.enableShow = true;
          }
        )
    }
  }

  newItem() {
    this.inspectionCategoryData = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.refresh();
  }

}