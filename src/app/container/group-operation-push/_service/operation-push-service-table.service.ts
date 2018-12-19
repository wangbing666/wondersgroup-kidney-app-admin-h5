import { Injectable } from '@angular/core';

import { TableTitle } from '../../../entities';

@Injectable()
export class OperationPushTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'pushId'
      }),
      new TableTitle({
        name: 'Push内容',
        key: 'content',
      }),
      new TableTitle({
        name: 'Push链接',
        key: 'url'
      }),
      new TableTitle({
        name: '点击量',
        key: 'appType'
      }),
      new TableTitle({
        name: '上传者',
        key: 'admin'
      }),
      new TableTitle({
        name: '发送时间',
        key: 'pushTime'
      }),
      new TableTitle({
        name: '状态',
        key: 'executeStatusName'
      }),
      new TableTitle({
        name: '编辑',
        key: 'executeStatus',
        controlType: 'showEdit',
        minwidth: 65
      })
    ];
    return Titles;
  }

}