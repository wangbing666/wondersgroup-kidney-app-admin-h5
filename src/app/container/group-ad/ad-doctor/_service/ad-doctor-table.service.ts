import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class AdDoctorTableService {

  setAdDoctorTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '图片',
        key: 'imageURL',
        controlType: 'image'
      }),
      new TableTitle({
        name: '广告名称',
        key: 'adsenseName'
      }),
      new TableTitle({
        name: '广告链接',
        key: 'adsenseURL',
        minwidth: 85
      }),
      new TableTitle({
        name: '推荐值',
        key: 'recommend'
      }),
      new TableTitle({
        name: '点击量',
        key: 'clickRate'
      }),
      new TableTitle({
        name: '上传者',
        key: 'backendAdministrator'
      }),
      new TableTitle({
        name: '上传时间',
        key: 'createTime'
      }),
      new TableTitle({
        name: '状态',
        key: 'status'
      }),
      new TableTitle({
        name: '上/下架',
        key: 'updown',
        controlType: 'showKey',
        minwidth: 65
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: 'showTitle',
        minwidth: 65
      }),
      new TableTitle({
        name: '删除',
        key: 'delete',
        controlType: 'showTitle',
        minwidth: 65
      })
    ];
    return Titles;
  }

}
