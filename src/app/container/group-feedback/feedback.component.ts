import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../entities';
import { Observable } from 'rxjs/Observable';
import { FeedbackService, FeedbackTableService } from './_service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent implements OnInit {
  title = '用户反馈';
  subTitle = '用户反馈';

  // 用户反馈数据维护列表
  feedbackTable: TableOption = new TableOption();
  feedbackLists: Array<any>;

  // 新建／编辑医院数据维护模态框选项
  modalTitle: string = '';
  status: string = '';
  enableEdit: boolean = false;
  feedback: any;

  // 展示信息模态框选项
  enableShow: boolean = false;
  titleShow: string;
  message: string;

  errorMessage: string;

  constructor(
    private _feedbackService: FeedbackService,
    private _feedbackTableService: FeedbackTableService
  ) {}

  ngOnInit() {
    this.getFeedbackTitles();
    this.getFeedbacks(0);
  }

  getFeedbackTitles(){
    this.feedbackTable.titles = this._feedbackTableService.setFeedbackTitles();
  }

  refresh(){
    this.getFeedbacks(0);
  }

  getFeedbacks(page: number){
    this.feedbackTable.currentPage = page;
    this._feedbackService.getFeedback(page, 20)
    .subscribe(
      data => {
        if (data.data.content.length === 0 && data.code === 0) {
            this.feedbackTable.errorMessage = "该数据为空哦～";
          } else if(data.code === 0){
          this.feedbackTable.totalPage = data.data.totalPages;
          this.feedbackTable.lists = data.data.content;
        }
      }, err => {
          this.feedbackTable.errorMessage = "啊哦！接口访问出错啦~";
      })
  }
}
