import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class DoctorTitleTableService {

  DoctorTitleTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '职称名称',
        key: 'name',
      }),
      new TableTitle({
        name: '编辑',
        key: 'editPositionalTitle',
        controlType: 'showTitle'
      }),
      new TableTitle({
        name: '删除',
        key: 'deletePositionalTitle',
        controlType: 'showTitle'
      })
    ];
    return Titles;
  }
  
}