import { Injectable, Inject } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class IntegralOrderService {

    constructor(private _apiService: ApiService) {}
    /**
     * 查询商品兑换管理-待处理/已处理
     * @param {[type]} idx [description]
     * @param {[type]} flag [description]
     */
    getIntegralOrder(type: number, size: number, page: number) {
        return this._apiService.get(`${PATH.integralOrderList}?type=${type}&size=${size}&page=${page}`);
  }

  /**
   * 积分订单商品数量
   */
   getIntegralOrderCount(){
       return this._apiService.get(`${PATH.integralOrderCount}`);
   }

    /**
     * 快递列表
     */
    getExpressList(){
        return this._apiService.get(`${PATH.integralOrderExpress}`);
    }

    /**
     * 编辑单号
     */

    editExpressNo(sendMallMsgDto){
        return this._apiService.post(`${PATH.integralOrderSend}`,sendMallMsgDto);
    }

}