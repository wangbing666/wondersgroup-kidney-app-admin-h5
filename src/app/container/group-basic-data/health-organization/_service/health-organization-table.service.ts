import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class HealthTableService {

  setThirdPartyTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '机构图片',
        key: 'headPortrait',
        controlType: 'image'
      }),
      new TableTitle({
        name: '机构名称',
        key: 'name',
      }),
      new TableTitle({
        name: '编辑',
        key: 'editThirdParty',
        controlType: 'showTitle'
      })
    ];
    return Titles;
  }

  
}