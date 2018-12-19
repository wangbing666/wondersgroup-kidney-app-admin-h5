import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class IntegralOrderTableService {

  /**
   * 待处理列表
   * @param {[type]} body [description]
   */
  setDealTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'orderId'
      }),
      new TableTitle({
        name: '姓名',
        key: 'username'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '地址',
        key: 'address'
      }),
      new TableTitle({
        name: '兑换商品',
        key: 'showGoods',
        controlType: 'showTitle',
        minwidth: 120
      }),
      new TableTitle({
        name: '兑换时间',
        key: 'orderTime'
      }),
      new TableTitle({
        name: '发送短信',
        key: 'sendMessage',
        controlType: 'showTitle',
        minwidth: 120
      })
    ];

    return Titles;
  }
 
  /**
   * 已处理列表
   * @param {[type]} body [description]
   */
  setDealedTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'orderId'
      }),
      new TableTitle({
        name: '姓名',
        key: 'username'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '地址',
        key: 'address'
      }),
      new TableTitle({
        name: '兑换商品',
        key: 'showGoods',
        controlType: 'showTitle',
        minwidth: 120
      }),
      new TableTitle({
        name: '兑换时间',
        key: 'orderTime'
      }),
      new TableTitle({
        name: '快递单号',
        key: 'expressNumber'
      }),
       new TableTitle({
        name: '处理人',
        key: 'admin'
      }),
      new TableTitle({
        name: '处理时间',
        key: 'operateTime'
      }),
      new TableTitle({
        name: '编辑单号',
        key: 'editNumber',
        controlType: 'showTitle',
        minwidth: 120
      })
    ];

    return Titles;
  }

  setDetailTitles(){
    let Titles: TableTitle[] = [
      new TableTitle({
        name: 'ID',
        key: 'id'
      }),
      new TableTitle({
        name: '商品名称',
        key: 'goodName'
      }),
      new TableTitle({
        name: '数量',
        key: 'amount'
      }),
    ];
    return Titles;
  }
}