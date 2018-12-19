import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class IntegralDetailTableService {
    setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '剩余积分',
        key: 'surplusValue'
      }),
      new TableTitle({
        name: '项目',
        key: 'source'
      }),
      new TableTitle({
        name: '明细',
        key: 'detailValue'
      })
    ];
    return Titles;
  }
}