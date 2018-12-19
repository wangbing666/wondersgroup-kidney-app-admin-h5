import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class IntegralDetailService {
    constructor(private _apiService: ApiService) {}

 /**
   * 获取积分明细列表
   * @param {string} type [description]
   * @param {number} size   [description]
   * @param {number} page   [description]
   */
  getIntegralDetail(type: number, size: number, page: number) {
      return this._apiService.get(`${PATH.integralDetailList}?type=${type}&size=${size}&page=${page}`);
    }

    /**
     * 姓名/手机号/项目搜索
     */
   getSearch(type: number, item: string){
      return this._apiService.get(`${PATH.integralOrderSearch}?type=${type}&item=${item}`);
   } 
}