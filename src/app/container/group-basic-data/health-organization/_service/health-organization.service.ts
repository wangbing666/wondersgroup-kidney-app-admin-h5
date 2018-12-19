import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class HealthService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取第三方机构列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getThirdParty(page: number, size: number) {
    return this._apiService.get(`${PATH.thirdParty}?page=${page}&size=${size}`);
  }

  /**
   * 新建第三方机构
   * @param {[type]} body [description]
   */
  thirdPartyCreate(data){
    return this._apiService.post(`${PATH.thirdParty}`,data);
  }

  /**
   * 编辑第三方机构
   * @param {[type]} body [description]
   */
  thirdPartyEdit(organizationId: number, data){
    return this._apiService.put(`${PATH.thirdParty}/${organizationId}`,data);
  }
  
}