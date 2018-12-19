import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TableOption } from '../../../entities';

import { NewsClassifyService, NewsClassifyTableService } from './_service';

@Component({
  selector: 'app-news-classify',
  templateUrl: './news-classify.component.html'
})
export class NewsClassifyComponent implements OnInit {
  title = '健康咨询分类数据维护';
  subTitle = '健康咨询分类数据列表';

  newsClassifyTable: TableOption = new TableOption();

  newsClassifyData: any;
  enableEdit: boolean;

  message: string;
  enableShow: boolean;

  constructor(
    private _newsClassifyService: NewsClassifyService,
    private _newsClassifyTableService: NewsClassifyTableService
  ) {}

  ngOnInit() {
    this.getNewsClassifyTitles();
    this.getNewsClassifies();
  }

  refresh() {
    this.getNewsClassifies();
  }

  getNewsClassifyTitles() {
    this.newsClassifyTable.titles = this._newsClassifyTableService.setTitles();
  }

  getNewsClassifies() {
    this._newsClassifyService.getNewsClassifies()
      .catch(
        err => {
          this.newsClassifyTable.errorMessage = "啊哦！接口访问出错啦～";
          return Observable.throw(err);
        })
      .subscribe(
        data => {
          if (data.data && data.data.length === 0 && data.code === 0) {
            this.newsClassifyTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.newsClassifyTable.lists = data.data;
          }
        })
  }

  gotoHandle(data) {
    if (data.key === 'edit') {
      this.newsClassifyData = data.value;
      this.enableEdit = true;
    }
  }

  newNewsClassify() {
    this.newsClassifyData = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.getNewsClassifies();
  }

}
