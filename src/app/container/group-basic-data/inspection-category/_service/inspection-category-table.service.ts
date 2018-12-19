import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class InspectionCategoryTableService {
  
  setTitles() {
      let Titles: TableTitle[] = [
        new TableTitle({
          name: '序号',
          key: 'id'
        }),
        new TableTitle({
          name: '检查类目名',
          key: 'name'
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