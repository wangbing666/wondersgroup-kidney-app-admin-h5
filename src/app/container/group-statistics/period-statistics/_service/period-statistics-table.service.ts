import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class PeriodStatisticsTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '时间段内登录总数',
        key: 'total'
      }),
      new TableTitle({
        name: '登录人数',
        key: 'num'
      }),
      new TableTitle({
        name: '登录率',
        key: 'ratio'
      }),
      new TableTitle({
        name: '人均登录数',
        key: 'average'
      })
    ];

    return Titles;
  }

}
