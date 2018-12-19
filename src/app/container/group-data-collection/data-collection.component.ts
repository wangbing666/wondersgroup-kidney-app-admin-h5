import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { TableOption } from '../../entities';
import { DataCollectionService, DataCollectionTableService} from './_service';

@Component({
  selector: 'app-data-collection',
  templateUrl: 'data-collection.component.html'
})
export class DataCollectionComponent implements OnInit {
  title = '病史资料录入';
  subTitle = '患者信息列表';

  waitingTable: TableOption = new TableOption();
  auditingTable: TableOption = new TableOption();
  auditedTable: TableOption = new TableOption();
  unhandledTable: TableOption = new TableOption();

  id: any;
  handleEnable = false;
  auditingEnable = false;

  enableShow = false;
  message = '';

  constructor(
    private router: Router,
    private _dataCollectionService: DataCollectionService,
    private _dataCollectionTableService: DataCollectionTableService
  ) {}

  ngOnInit() {
    this.getDataCollectionTitles();
    this.refresh();
  }

  refresh() {
    this.getDataCollections(this.waitingTable, 0, 0);
    this.getDataCollections(this.auditingTable, 1, 0);
    this.getDataCollections(this.auditedTable, 3, 0);
    this.getDataCollections(this.unhandledTable, 2, 0);
  }

  getDataCollectionTitles() {
    this.waitingTable.titles = this._dataCollectionTableService.setWaitingTitles();
    this.auditingTable.titles = this._dataCollectionTableService.setAuditingTitles();
    this.auditedTable.titles = this._dataCollectionTableService.setAuditedTitles();
    this.unhandledTable.titles = this._dataCollectionTableService.setUnhandledTitles();
  }

  resetData(list: TableOption) {
    list.lists = null;
    list.loading = true;
    list.errorMessage = '';
  }

  getDataCollections(list: TableOption, type, page) {
    this.resetData(list);
    list.currentPage = page;
    this._dataCollectionService.getDataCollections(page, list.size, type)
      .subscribe(
        res => {
          list.loading = false;
          if(res.code === 0 && res.data && res.data.content && res.data.content.length == 0) {
            list.errorMessage = '该数据为空哦～';
          } else if( res.code ===0 && res.data && res.data.content) {
            list.lists = res.data.content;
            list.lists.forEach(obj => {
              this.format(obj);
            })
            this.formatlist(list.lists);
            // console.log(list.lists);
            list.totalPage = res.data.totalPages;
          } else {
            list.errorMessage = '空空如也～';
          }
        }, err => {
          list.loading = false;
          list.errorMessage = '啊哦！接口访问出错啦～';
        });
  }

  format(data) {
    if(data.inputList) {
      let inputName = ' ';
      data.inputList.forEach(obj => {
        inputName += ` ${obj.name}`;
      })
      data.inputName = inputName;
    }
    if(data.auditorList) {
      let auditorName = ' ';
      data.auditorList.forEach(obj => {
        auditorName += ` ${obj.name}`;
      })
      data.auditorName = auditorName;
    }
  }

  gotoHandle(data) {
    // console.log(data);
    if(data.key === 'dataTypein') {
      this.router.navigate(['/data-collection/edit', data.value.id]);
    }
    if(data.key === 'showData') {
      this.router.navigate(['/data-collection/detail', data.value.id]);
    }
    if(data.key === 'keepData') {
      this.id = data.value.id;
      this.handleEnable = true;
    }
    if(data.key === 'tapeOut') {
      this.id = data.value.id;
      this.auditingEnable = true;
    }
  }

  done(res){
    this.handleEnable = false;
    this.auditingEnable = false;
    if(res.code == -1) {
      this.message = res.msg;
      this.enableShow = true;
    } else {
      this.refresh();
    }
  }
  
  formatlist(list) {
    if(typeof list === 'object') {
      list.forEach(obj => {
        obj.deleted = obj.deleted ? '已删除' : '否';
      });
    }
  }
}