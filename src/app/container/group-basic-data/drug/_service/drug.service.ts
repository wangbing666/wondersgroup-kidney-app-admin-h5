import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class DrugService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取药品列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getDrugs(page: number, size: number) {
    return this._apiService.get(`${PATH.drugList}?page=${page}&size=${size}`);
  }

  /**
   * 新建药品
   * @param {[type]} body [description]
   */
  drugCreate(data){
    return this._apiService.post(`${PATH.drugSave}`,data);
  }

  /**
   * 编辑药品
   * @param {[type]} body [description]
   */
  drugEdit(id: number, data){
    return this._apiService.post(`${PATH.drugUpdate}/${id}`,data);
  }
  
}