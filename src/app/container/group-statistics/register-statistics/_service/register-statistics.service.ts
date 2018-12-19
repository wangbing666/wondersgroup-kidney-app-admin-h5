import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services';

@Injectable()
export class RegisterStatisticsService {
  
  constructor(private _apiService: ApiService) {}

  /**
   * 获取患者注册量统计
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getUsers(page: number, size: number) {
    return this._apiService.get(`${PATH.userRegister}?page=${page}&size=${size}`);
  }

  /**
   * 获取医生注册量统计
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getDoctors(page: number, size: number) {
    return this._apiService.get(`${PATH.doctorRegister}?page=${page}&size=${size}`);
  }

}