import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class DoctorServiceTableService {

  setDoctorallTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id',
      }),
      new TableTitle({
        name: '医生',
        key: 'doctorName',
      }),
      new TableTitle({
        name: '开通服务',
        key: 'serviceName',
      }),
      new TableTitle({
        name: '服务价格',
        key: 'price',
        frequency:'frequency',
        controlType: 'showFrequency'
      }),
      new TableTitle({
        name: '已服务',
        key: 'serviceNumber',
      }),
      new TableTitle({
        name: '成立时间',
        key: 'timeLimit'
      }),
      new TableTitle({
        name: '服务明细',
        key: 'edit',
        controlType: 'showTitle'
      })
    ];
    return Titles;
  }

  setDoctorAuditingTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '医生',
        key: 'doctorName',
      }),
      new TableTitle({
        name: '开通服务',
        key: 'serviceName',
      }),
      new TableTitle({
        name: '价格',
        key: 'price',
        frequency:'frequency',
        controlType: 'showFrequency'
      }),
      new TableTitle({
        name: '开通时间',
        key: 'creationTime'
      }),
      new TableTitle({
        name: '状态',
        key: 'auditName'
      }),
      new TableTitle({
        name: '操作',
        key: 'audit',
        controlType: 'showKey'
      }),
    ];
    return Titles;
  }

  setDoctoreditTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '购买人',
        key: 'userName',
      }),
      new TableTitle({
        name: '服务名称',
        key: 'infoName',
      }),
      new TableTitle({
        name: '购买时间',
        key: 'recordTime',
      }),
    ];
    return Titles;
  }


}
