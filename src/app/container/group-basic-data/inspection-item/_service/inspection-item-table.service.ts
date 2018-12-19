import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class InspectionItemTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '所属类目',
        key: 'recordExaminationTypeName'
      }),
      new TableTitle({
        name: '项目名称',
        key: 'name'
      }),
      new TableTitle({
        name: '别名',
        key: 'alias'
      }),
      new TableTitle({
        name: '类型',
        key: 'typeName'
      }),
      new TableTitle({
        name: '单位',
        key: 'unit'
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: 'showTitle'
      }),
      new TableTitle({
        name: '删除',
        key: 'delete',
        controlType: 'showTitle'
      })
    ];

    return Titles;
  }

}