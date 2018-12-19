import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class DepartmentTableService {

  setDepartmentTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '科室名称',
        key: 'name',
      }),
      new TableTitle({
        name: '编辑',
        key: 'editDepartment',
        controlType: 'showTitle'
      })
    ];
    return Titles;
  }

  
}