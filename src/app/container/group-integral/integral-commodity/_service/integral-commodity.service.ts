import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class IntegralCommodityService {

  constructor(private _apiService: ApiService) {}

  /**
   * 查询所有商品
   * @param {number} flag   [description]
   */
  getIntegralCommodity(size: number, page: number) {
      return this._apiService.get(`${PATH.integralCommodityList}?size=${size}&page=${page}`);
  }

  /**
   * 新增编辑商品
   */
  integralCommodityUpdate(body: any) {
    return this._apiService.post(`${PATH.integralCommodityEdit}`,body);
  }

  /**
   * 删除商品
   */
  integralCommodityDelete(goodId: number){
    return this._apiService.delete(`${PATH.integralCommodityDelete}?goodId=${goodId}`);
  }

  /**
   * 上下架
   */
   integralCommodityEnabled(goodId: number, enabled: boolean){
    return this._apiService.post(`${PATH.integralCommodityEnabled}?goodId=${goodId}&enabled=${enabled}`,{});
  }

   /**
    * 查询状态
    */
    integralCommodityType(){
        return this._apiService.get(`${PATH.integralCommodityType}`);
    }
}
