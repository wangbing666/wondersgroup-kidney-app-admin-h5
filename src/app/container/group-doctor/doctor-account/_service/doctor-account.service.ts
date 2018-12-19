import { Injectable, Inject } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class DoctorAccountService {

  constructor(@Inject('admin') private admin, private _apiService: ApiService) {}

  /**
   * 全部医生账户列表
   * @param {number} page [description]
   * @param {number} size [description]
   */
  getDoctorAccounts(page: number, size: number) {
    return this._apiService.get(`${PATH.doctorAccount}?page=${page}&size=${size}`);
  }

  /**
   * 医生账户收入明细
   * @param {number} doctorId [description]
   * @param {number} page     [description]
   * @param {number} size     [description]
   */
  getIncomeDetail(doctorId: number, page: number, size: number) {
    return this._apiService.get(`${PATH.doctorAccount}/${doctorId}/income?page=${page}&size=${size}`);
  }

  /**
   * 医生账户提现明细
   * @param {number} doctorId [description]
   * @param {number} page     [description]
   * @param {number} size     [description]
   */
  getWithdrawDetail(doctorId: number, page: number, size: number) {
    return this._apiService.get(`${PATH.doctorAccount}/${doctorId}/outcome?page=${page}&size=${size}`);
  }

  /**
   * 提现列表
   * @param {number} page [description]
   * @param {number} size [description]
   */
  getWithdrawDeposits(page: number, size: number) {
    return this._apiService.get(`${PATH.withdrawDeposit}?page=${page}&size=${size}`);
  }

  /**
   * 提现处理
   * @param {number} id   [description]
   * @param {any}    data [description]
   */
  refundOperation(id: number, target: boolean) {
    return this._apiService.post(
      `${PATH.withdrawDeposit}/${id}`, {
        succeeded: target,
        adminId: this.admin.getId()
      }
    );
  }

  /**
   * 获取未处理打款个数
   */
  untreatedCount() {
    return this._apiService.get(`${PATH.withdrawDeposit}/count?transactionStatus=0`);
  }

}
