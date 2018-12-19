import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class NewsClassifyTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '健康资讯分类',
        key: 'name',
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: 'showTitle'
      })
    ];
    return Titles;
  }


}
