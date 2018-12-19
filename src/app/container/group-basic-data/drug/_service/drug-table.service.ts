import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class DrugTableService {

  setDrugTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '分类',
        key: 'number'
      }),
      new TableTitle({
        name: '药品通用名',
        key: 'medicineName'
      }),
      new TableTitle({
        name: '商品名称',
        key: 'packaging'
      }),
      new TableTitle({
        name: '品牌',
        key: 'company',
      }),
        new TableTitle({
        name: '性状',
        key: 'properties',
      }),
      new TableTitle({
        name: '单位',
        key: 'unit',
      }),
      new TableTitle({
        name: '状态',
        key: 'displayName',
      }),
      new TableTitle({
        name: '编辑',
        key: 'editDrug',
        controlType: 'showTitle'
      })
    ];
    return Titles;
  }

  
}