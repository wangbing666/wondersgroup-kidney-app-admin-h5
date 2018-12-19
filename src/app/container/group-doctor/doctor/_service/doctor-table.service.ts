import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class DoctorTableService {

  setDoctorAuditedTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '头像',
        key: 'headPortrait',
        controlType: 'image'
      }),
      new TableTitle({
        name: '医生姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '所属医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '所属科室',
        key: 'departmentName'
      }),
      new TableTitle({
        name: '职称',
        key: 'doctorTitleName'
      }),
      new TableTitle({
        name: '职称证明和医院工牌',
        key: 'certification',
        controlType: 'showNull'
      }),
      new TableTitle({
        name: '推荐下载',
        key: 'recommendDownloads'
      }),
      new TableTitle({
        name: '剩余积分',
        key: 'point',
      }),
      new TableTitle({
        name: '积分明细',
        key: 'point',
        controlType: 'showTitle',
        minwidth: 65
      }),
      new TableTitle({
        name: '审核人',
        key: 'assessor'
      }),
      new TableTitle({
        name: '审核时间',
        key: 'assessDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: 'showTitle',
        minwidth: 65
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
        name: '头像',
        key: 'headPortrait',
        controlType: 'image'
      }),
      new TableTitle({
        name: '医生姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '所属医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '所属科室',
        key: 'departmentName'
      }),
      new TableTitle({
        name: '职称',
        key: 'doctorTitleName'
      }),
      new TableTitle({
        name: '职称证明和医院工牌',
        key: 'certification',
        controlType: 'showNull'
      }),
      new TableTitle({
        name: '状态',
        key: 'attestStatusName'
      }),
      new TableTitle({
        name: '提交时间',
        key: 'commitDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: 'showTitle',
        minwidth: 65
      }),
      new TableTitle({
        name: '通过',
        key: 'assess',
        controlType: 'showTitle',
        minwidth: 65
      }),
      new TableTitle({
        name: '拒绝',
        key: 'refuse',
        controlType: 'showTitle',
        minwidth: 65
      }),
    ];
    return Titles;
  }

  setDoctorFailureTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '头像',
        key: 'headPortrait',
        controlType: 'image'
      }),
      new TableTitle({
        name: '医生姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '所属医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '所属科室',
        key: 'departmentName'
      }),
      new TableTitle({
        name: '职称',
        key: 'doctorTitleName'
      }),
      new TableTitle({
        name: '职称证明和医院工牌',
        key: 'certification',
        controlType: 'showNull'
      }),
      new TableTitle({
        name: '审核人',
        key: 'assessor'
      }),
      new TableTitle({
        name: '审核时间',
        key: 'assessDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '拒绝理由',
        key: 'refuseCause',
        controlType: 'showNull'
      }),
      new TableTitle({
        name: '编辑',
        key: 'failureEdit',
        controlType: 'showTitle',
        minwidth: 65
      })
    ];
    return Titles;
  }
}
