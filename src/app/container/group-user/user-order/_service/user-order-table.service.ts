import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class UserOrderTableService {

  setUserOrderTitles() {
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
        name: '手机号',
        key: 'userTel',
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'serviceProvider',
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName',
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
      }),
      new TableTitle({
        name: '状态',
        key: 'status',
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'orderId'
      }),
      new TableTitle({
        name: '剩余问题数量',
        key: 'questionLeft'
      })
    ];
    return Titles;
  }

  setRefundOrderTitles() {
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
        name: '手机号',
        key: 'userTel',
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'serviceProvider',
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName',
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'orderId'
      }),
      new TableTitle({
        name: '操作',
        key: 'refund',
        controlType: 'showTitle',
        minwidth: 65
      })
    ];
    return Titles;
  }

  setUntreatedOrderTitles() {
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
        name: '手机号',
        key: 'userTel',
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'serviceProvider',
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName',
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'orderId'
      }),
      new TableTitle({
        name: '操作',
        key: 'thirdProcess',
        controlType: 'showTitle',
        minwidth: 65
      })
    ];
    return Titles;
  }

}
