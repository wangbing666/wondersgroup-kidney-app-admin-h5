import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class HealthServiceTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '服务图片',
        key: 'mainFigure',
        controlType: 'image'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'name',
      }),
      new TableTitle({
        name: '服务机构',
        key: 'providerName'
      }),
      new TableTitle({
        name: '服务价格',
        key: 'price',
      }),
      new TableTitle({
        name: '添加人',
        key: 'adminId',
      }),
      new TableTitle({
        name: '添加时间',
        key: 'createTime',
      }),
      new TableTitle({
        name: '状态',
        key: 'enabled',
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
