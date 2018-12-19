import { Injectable } from '@angular/core';

import { TableTitle } from '../../../entities';

@Injectable()
export class FeedbackTableService {

  setFeedbackTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id',
      }),
      new TableTitle({
        name: '姓名',
        key: 'name',
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
      }),
      new TableTitle({
        name: '所属端',
        key: 'type',
      }),
      new TableTitle({
        name: '反馈内容',
        key: 'content',
        maxwidth: 380,
      }),
      new TableTitle({
        name: '反馈时间',
        key: 'createdDate',
      })
    ];
    return Titles;
  }

  
}