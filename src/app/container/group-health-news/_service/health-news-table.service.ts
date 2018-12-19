import { Injectable } from '@angular/core';

import { TableTitle } from '../../../entities';

@Injectable()
export class HealthNewsTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: 'ID',
        key: 'id'
      }),
      new TableTitle({
        name: '图片',
        key: 'thumbnails',
        controlType: 'image'
      }),
      new TableTitle({
        name: '文章标题',
        key: 'title'
      }),
      new TableTitle({
        name: '文章链接',
        key: 'url',
        maxwidth: 300
      }),
      new TableTitle({
        name: '推荐',
        key: 'recommendName'
      }),
      new TableTitle({
        name: '推荐值',
        key: 'recommendedValue'
      }),
      new TableTitle({
        name: '实际阅读量',
        key: 'realReadingQuantity'
      }),
      new TableTitle({
        name: '展示阅读量',
        key: 'readingQuantity'
      }),
      new TableTitle({
        name: '上传者',
        key: 'author'
      }),
      new TableTitle({
        name: '上传时间',
        key: 'date',
        minwidth: 70
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        minwidth: 65,
        controlType: 'showTitle'
      }),
      new TableTitle({
        name: '删除',
        key: 'del',
        minwidth: 65,
        controlType: 'showTitle'
      })
    ];

    return Titles;
  }
}
