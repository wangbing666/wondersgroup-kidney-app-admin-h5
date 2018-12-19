import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class BasicServiceService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取医生服务列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getBasicService(page: number, size: number) {
    return this._apiService.get(`${PATH.doctorServiceList}?page=${page}&size=${size}`);
  }

  /**
   * 新建医生服务
   * @param {[type]} body [description]
   */
  basicServiceCreate(data){
    return this._apiService.post(`${PATH.doctorServiceAdd}`,data);
  }

  /**
   * 编辑医生服务
   * @param {[type]} body [description]
   */
  basicServiceEdit(id: number, data){
    return this._apiService.post(`${PATH.doctorServiceEdit}/${id}`,data);
  }
  
}