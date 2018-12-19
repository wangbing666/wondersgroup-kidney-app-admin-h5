import { Injectable } from '@angular/core';

import { TableTitle } from '../../../entities';

@Injectable()
export class DataCollectionTableService {

  setWaitingTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '患者姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '实名认证',
        key: 'authenticate'
      }),
      new TableTitle({
        name: '年龄',
        key: 'age'
      }),
      new TableTitle({
        name: '性别',
        key: 'sex'
      }),
      new TableTitle({
        name: '手术医院',
        key: 'hospitalName',
      }),
      new TableTitle({
        name: '手术医生',
        key: 'doctorName'
      }),
      new TableTitle({
        name: '上传时间',
        key: 'uploadDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '是否删除',
        key: 'deleted'
      }),
      new TableTitle({
        name: '资料录入',
        key: 'dataTypein',
        controlType: 'showTitle',
        minwidth: 100
      }),
      new TableTitle({
        name: '暂不处理',
        key: 'keepData',
        controlType: 'showTitle',
        minwidth: 100
      })
    ];
    return Titles;
  }

  setAuditingTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '患者姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '实名认证',
        key: 'authenticate'
      }),
      new TableTitle({
        name: '年龄',
        key: 'age'
      }),
      new TableTitle({
        name: '性别',
        key: 'sex'
      }),
      new TableTitle({
        name: '手术医院',
        key: 'doctorName'
      }),
      new TableTitle({
        name: '手术医生',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '上传时间',
        key: 'uploadData',
        minwidth: 70
      }),
      new TableTitle({
        name: '录入人',
        key: 'inputName'
      }),
      new TableTitle({
        name: '审核人',
        key: 'auditorName'
      }),
      new TableTitle({
        name: '是否删除',
        key: 'deleted'
      }),
      new TableTitle({
        name: '查看资料',
        key: 'showData',
        controlType: 'showTitle',
        minwidth: 100
      })
    ];
    return Titles;
  }

  setAuditedTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '患者姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '实名认证',
        key: 'authenticate'
      }),
      new TableTitle({
        name: '年龄',
        key: 'age'
      }),
      new TableTitle({
        name: '性别',
        key: 'sex'
      }),
      new TableTitle({
        name: '手术医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '手术医生',
        key: 'doctorName'
      }),
      new TableTitle({
        name: '上传时间',
        key: 'uploadDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '录入人',
        key: 'inputName'
      }),
      new TableTitle({
        name: '审核人',
        key: 'auditorName'
      }),
      new TableTitle({
        name: '是否删除',
        key: 'deleted'
      }),
      new TableTitle({
        name: '查看资料',
        key: 'showData',
        controlType: 'showTitle',
        minwidth: 100
      }),
      new TableTitle({
        name: '下线',
        key: 'tapeOut',
        controlType: 'showTitle',
        minwidth: 65
      })
    ];

    return Titles;
  }

  setUnhandledTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '患者姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '实名认证',
        key: 'authenticate'
      }),
      new TableTitle({
        name: '年龄',
        key: 'age'
      }),
      new TableTitle({
        name: '性别',
        key: 'sex'
      }),
      new TableTitle({
        name: '手术医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '手术医生',
        key: 'doctorName'
      }),
      new TableTitle({
        name: '上传时间',
        key: 'uploadDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '备注',
        key: 'remark'
      }),
      new TableTitle({
        name: '是否删除',
        key: 'deleted'
      }),
      new TableTitle({
        name: '录入资料',
        key: 'dataTypein',
        controlType: 'showTitle',
        minwidth: 100
      })
    ];

    return Titles;
  }
  
}
