import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class DiscomfortTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '图片',
        key: 'image',
        controlType: 'image'
      }),
      new TableTitle({
        name: '不适症状名称',
        key: 'name',
      }),
      new TableTitle({
        name: '状态',
        key: 'enabledName',
      }),
      new TableTitle({
        name: '编辑',
        key: 'editDiscomfort',
        controlType: 'showTitle'
      })
    ];
    return Titles;
  }

  
}