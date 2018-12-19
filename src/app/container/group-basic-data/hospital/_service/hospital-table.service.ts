import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class HospitalTableService {

  setHospitalTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id',
      }),
      new TableTitle({
        name: '医院名称',
        key: 'name',
      }),
      new TableTitle({
        name: '编辑',
        key: 'editHospital',
        controlType: 'showTitle'
      })
    ];
    return Titles;
  }

  
}