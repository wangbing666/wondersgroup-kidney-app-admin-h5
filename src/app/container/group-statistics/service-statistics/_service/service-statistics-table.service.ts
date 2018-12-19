import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class ServiceStatisticsTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '日期',
        key: 'date',
        minwidth: 70
      }),
      new TableTitle({
        name: '服务申请次数',
        key: 'applyCount'
      }),
      new TableTitle({
        name: '医生接受服务次数',
        key: 'effectiveServiceCount',
        minwidth: 85
      }),
      new TableTitle({
        name: '正在服务次数',
        key: 'servicingCount'
      }),
      new TableTitle({
        name: '历史服务次数',
        key: 'historyCount'
      }),
      new TableTitle({
        name: '医患沟通服务总数',
        key: 'accessCount'
      }),
      new TableTitle({
        name: '患者已使用咨询次数',
        key: 'usedQuestionCount'
      })
    ];

    return Titles;
  }

  
}
