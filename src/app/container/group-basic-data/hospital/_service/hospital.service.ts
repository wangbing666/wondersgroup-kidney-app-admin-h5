import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class HospitalService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取医院列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getHospital(page: number, size: number) {
    return this._apiService.get(`${PATH.hospital}?page=${page}&size=${size}`);
  }

  /**
   * 新建医院
   * @param {[type]} body [description]
   */
  hospitalCreate(name: string){
    return this._apiService.post(`${PATH.hospital}`,
    {
      name: name
    });
  }

  /**
   * 编辑医院
   * @param {[type]} body [description]
   */
  hospitalEdit(hospitalId: number, name: string){
    return this._apiService.put(`${PATH.hospital}/${hospitalId}`,
    {
      name: name
    });
  }
  
}