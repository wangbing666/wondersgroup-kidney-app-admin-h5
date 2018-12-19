import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class DiscomfortService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取不适症状类型列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getDiscomfortType() {
    return this._apiService.get(`${PATH.symptomType}`);
  }

  /**
   * 获取不适症状列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getDiscomfort(id: number,page: number, size: number) {
    return this._apiService.get(`${PATH.symptom}?categoryId=${id}&page=${page}&size=${size}`);
  }

  /**
   * 新建不适症状
   * @param {[type]} body [description]
   */
  discomfortCreate(data){
    return this._apiService.post(`${PATH.symptom}`,data);
  }

  /**
   * 编辑不适症状
   * @param {[type]} body [description]
   */
  discomfortEdit(symptomId: number,data){
    return this._apiService.put(`${PATH.symptom}/${symptomId}`,data);
  }
  
}