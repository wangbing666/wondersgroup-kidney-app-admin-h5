import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { InspectionItemService, InspectionItemTableService } from './_service';

declare var $: any;

@Component({
  selector: 'app-inspection-item',
  templateUrl: 'inspection-item.component.html'
})
export class InspectionItemComponent implements OnInit {
  
  title = '检查子项目维护';
  subTitle = '检查子项目维护列表';

  inspectionItemTable: TableOption;
  inspectionType: any;
  selectedType = { id: null, name: '' };

  inspectionItemData: any;
  enableEdit: boolean;

  message: string;
  enableShow: boolean;

  constructor(
    private _inspectionItemService: InspectionItemService,
    private _inspectionItemTableService: InspectionItemTableService
  ) {
    this.getInspectionCategories();
  }

  ngOnInit() {
    $('#type').dropdown();
    this.refresh();
  }

  refresh() {
    this.inspectionItemTable = new TableOption();
    this.getInspectionItemTitles();
    if (this.selectedType.id === null) {
      this.getInspectionCategories()
        .subscribe(
          res => {
            this.getInspectionItems(0);
          } ,err => {
            this.inspectionItemTable.loading = false;
            this.inspectionItemTable.errorMessage = '啊哦！接口访问出错啦～';
          }
        )
    } else {
      this.getInspectionItems(0);
    }
  }

  getType(opt) {
    this.selectedType = opt;
    this.refresh();
  }

  getInspectionItemTitles() {
    this.inspectionItemTable.titles = this._inspectionItemTableService.setTitles();
  }

  getInspectionItems(page) {
    this.inspectionItemTable.currentPage = page;
    this._inspectionItemService.getInspectionItems(page, this.inspectionItemTable.size, this.selectedType.id)
      .subscribe(
         res => {
           this.inspectionItemTable.loading = false;
           if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
             this.inspectionItemTable.errorMessage = '该数据为空哦～';
           } else if (res.code === 0 && res.data && res.data.content) {
             this.inspectionItemTable.lists = res.data.content;
             this.inspectionItemTable.totalPage = res.data.totalPages;
           } else {
             this.inspectionItemTable.errorMessage = '空空如也～';
           }
         }, err => {
           this.inspectionItemTable.loading = false;
           this.inspectionItemTable.errorMessage = '啊哦！接口访问出错啦～';
         }
      )
  }

  getInspectionCategories() {
    return this._inspectionItemService.getInspectionCategories()
      .map(
         res => {
           if (res.code === 0 && res.data) {
             this.inspectionType = res.data;
             this.selectedType = this.inspectionType[0];
           } else {
             this.inspectionType = null;
           }
         }
      )
  }

  gotoHandle(data) {
    if (data.key === 'edit') {
      this.inspectionItemData = data.value;
      this.enableEdit = true;
    }

    if (data.key === 'delete') {
      // console.log(data.value);
      this._inspectionItemService.inspectionItemDelete(data.value.id)
        .subscribe(
          res => {
            if (res.code === 0) {
              this.message = '检查子项目删除成功！';
              this.enableShow = true;
              this.refresh();
            } else {
              if(res.msg) {
                this.message = res.msg;
              } else {
                this.message = "检查子项目删除失败！";
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
    this.inspectionItemData = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.refresh();
  }
}