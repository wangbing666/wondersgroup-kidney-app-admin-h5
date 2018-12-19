import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class BasicServiceTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '服务图片',
        key: 'image',
        controlType: 'image'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'name',
      }),
      new TableTitle({
        name: '咨询次数',
        key: 'frequency',
      }),
      new TableTitle({
        name: '服务时长',
        key: 'timeChan',
      }),
      new TableTitle({
        name: '最大金额',
        key: 'maxValue',
      }),
      new TableTitle({
        name: '最小金额',
        key: 'minValue',
      }),
      new TableTitle({
        name: '状态',
        key: 'nameOpenString',
      }),
      new TableTitle({
        name: '编辑',
        key: 'editBasicService',
        controlType: 'showTitle'
      })
    ];
    return Titles;
  }

  
}