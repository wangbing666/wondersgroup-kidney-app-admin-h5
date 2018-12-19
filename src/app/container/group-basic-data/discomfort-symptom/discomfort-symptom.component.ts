import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TableOption } from '../../../entities';

import { DiscomfortService, DiscomfortTableService } from './_service';

declare var $: any;

@Component({
  selector: 'discomfort-symptom',
  templateUrl: './discomfort-symptom.component.html',
  // styleUrls: ['./health-news.component.css']
})
export class DiscomfortComponent implements OnInit {
  title = '基础数据维护';
  subTitle = '不适症状维护';

  discomfortTable: TableOption = new TableOption();
  discomfortType: any;
  selectedType = { id: null, name: '' };

  discomfortData: any;
  enableEdit: boolean;

  message: string;
  enableShow: boolean;

  constructor(
    private _discomfortService: DiscomfortService,
    private _discomfortTableService: DiscomfortTableService
  ) {}

  ngOnInit() {
    $('#discomfortType').dropdown();
    this.getDiscomfortTitles();
    this.getDiscomfortType()
      .subscribe(
        () => {
          this.getDiscomforts(0);
        })
  }

  getType(opt) {
    this.selectedType = opt;
    this.getDiscomforts(0);
  }

  refresh() {
    this.getDiscomforts(0);
  }

  getDiscomfortType() {
    return this._discomfortService.getDiscomfortType()
      .catch(
        err => {
          this.discomfortTable.errorMessage = "啊哦！接口访问出错啦～";
          return Observable.throw(err);
        })
      .map(
        data => {
          if (data.code == 0) {
            this.discomfortType = data.data;
            this.selectedType = data.data[0];

            // console.log(this.discomfortType);
          }
        })
  }

  getDiscomfortTitles() {
    this.discomfortTable.titles = this._discomfortTableService.setTitles();
  }

  getDiscomforts(page: number) {
    this.discomfortTable.currentPage = page;
    this._discomfortService.getDiscomfort(this.selectedType.id, page, this.discomfortTable.size)
      .catch(
        err => {
          this.discomfortTable.lists = null;
          this.discomfortTable.errorMessage = "啊哦！接口访问出错啦～";
          return Observable.throw(err);
        })
      .subscribe(
        data => {
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.discomfortTable.lists = null;
            this.discomfortTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.discomfortTable.totalPage = data.data.totalPages;
            this.discomfortTable.lists = data.data.content;
          } else {
            this.discomfortTable.lists = null;
            this.discomfortTable.errorMessage = "啊哦！没有接收到数据哎～";
          }
        })
  }

  getDiscomfortSelected(div) {
    this.selectedType = div.target.value;
    this.getDiscomforts(0);
  }

  gotoHandle(data) {
    if (data.key === 'editDiscomfort') {
      this.discomfortData = data.value;
      this.enableEdit = true;
    }
  }

  newDiscomfort() {
    this.discomfortData = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.getDiscomforts(0);
  }
}
