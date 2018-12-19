import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class DoctorAccountTableService {

  /**
   * 全部账户
   * @param {[type]} body [description]
   */
  setDoctorAccountTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '头像',
        key: 'portraitUrl',
        controlType: 'image'
      }),
      new TableTitle({
        name: '医生姓名',
        key: 'name',
      }),
      new TableTitle({
        name: '手机号码',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '所属医院',
        key: 'hospital',
      }),
      new TableTitle({
        name: '所属科室',
        key: 'department',
      }),
      new TableTitle({
        name: '职称',
        key: 'title',
      }),
      new TableTitle({
        name: '收入',
        key: 'income',
        controlType: 'showExtra'
      }),
      new TableTitle({
        name: '已提现',
        key: 'withdraw',
        controlType: 'showExtra'
      }),
      new TableTitle({
        name: '剩余',
        key: 'balance'
      })
    ];

    return Titles;
  }

  /**
   * 提现处理
   * @param {[type]} body [description]
   */
  setWithdrawDepositTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '提现人',
        key: 'doctorName',
      }),
      new TableTitle({
        name: '手机号码',
        key: 'doctorTel',
      }),
      new TableTitle({
        name: '提现金额',
        key: 'amount'
      }),
      new TableTitle({
        name: '持卡人姓名',
        key: 'cardCardholder',
      }),
      new TableTitle({
        name: '持卡人手机号',
        key: 'cardPhoneNumber',
      }),
      new TableTitle({
        name: '银行',
        key: 'cardBankName'
      }),
      new TableTitle({
        name: '卡号',
        key: 'cardCardNumber'
      }),
      new TableTitle({
        name: '总打款金额',
        key: 'historicalSum'
      }),
      new TableTitle({
        name: '提现时间',
        key: 'submitTime',
        minwidth: 70,
      }),
      new TableTitle({
        name: '操作',
        key: 'pay',
        controlType: 'showTitle',
        minwidth: 65
      }),
      new TableTitle({
        name: '状态',
        key: 'statusName'
      }),
      new TableTitle({
        name: '处理人',
        key: 'adminUsername'
      }),
      new TableTitle({
        name: '处理时间',
        key: 'submitTime',
        minwidth: 70,
      })
    ];

    return Titles;
  }

  /**
   * 提现明细
   * @param {[type]} body [description]
   */
  setWithdrawDetailTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '提现金额',
        key: 'amount'
      }),
      new TableTitle({
        name: '姓名',
        key: 'bankcardBankName'
      }),
      new TableTitle({
        name: '银行',
        key: 'bankcardCardholder'
      }),
      new TableTitle({
        name: '卡号',
        key: 'bankcardCardNumber'
      }),
      new TableTitle({
        name: '提现时间',
        key: 'submitTime',
        minwidth: 70,
      }),
      new TableTitle({
        name: '提现状态',
        key: 'statusName'
      }),
      new TableTitle({
        name: '处理人',
        key: 'adminName'
      }),
      new TableTitle({
        name: '处理时间',
        key: 'transactionTime',
        minwidth: 70,
      })
    ];

    return Titles;
  }

  /**
   * 收入明细
   * @param {[type]} body [description]
   */
  setIncomeDetailTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '患者',
        key: 'patientName'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime'
      }),
      new TableTitle({
        name: '服务',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '开始时间',
        key: 'startTime',
      }),
      new TableTitle({
        name: '结束时间',
        key: 'endTime',
      }),
      new TableTitle({
        name: '收入',
        key: 'amount'
      })
    ];

    return Titles;
  }

}
