import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class UserTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '头像',
        key: 'head',
        controlType: 'image'
      }),
      new TableTitle({
        name: '患者姓名',
        key: 'name',
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel'
      }),
      new TableTitle({
        name: '性别',
        key: 'gender',
      }),
      new TableTitle({
        name: '年龄',
        key: 'age',
      }),
      new TableTitle({
        name: '肾移植医院',
        key: 'hospitalName',
      }),
      new TableTitle({
        name: '肾来源',
        key: 'kidneySourceName',
      }),
      new TableTitle({
        name: '肾移植时间',
        key: 'kidneyDate',
      }),
      new TableTitle({
        name: '住址',
        key: 'address',
      }),
      new TableTitle({
        name: '认证状态',
        key: 'validateStatus',
      }),
      new TableTitle({
        name: '剩余积分',
        key: 'point',
      }),
      new TableTitle({
        name: '积分明细',
        key: 'point',
        minwidth: 70,
        controlType: 'showTitle'
      }),
      new TableTitle({
        name: '备注',
        key: 'remark',
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        minwidth: 70,
        controlType: 'showTitle'
      })
    ];
    return Titles;
  }

}
