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
        name: '积分流水',
        key: 'detailValue'
      }),
      new TableTitle({
        name: '剩余积分',
        key: 'surplusValue'
      }),
      new TableTitle({
        name: '项目',
        key: 'source',
      }),
      new TableTitle({
        name: '被邀请人手机号',
        key: 'tel'
      }),
      new TableTitle({
        name: '时间',
        key: 'createDate',
      }),
    ];
    
    return Titles;
  }

}
