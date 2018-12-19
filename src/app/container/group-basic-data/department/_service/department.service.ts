import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class DepartmentService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取科室列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getDepartment(page: number, size: number) {
    return this._apiService.get(`${PATH.departmentList}?page=${page}&size=${size}`);
  }

  /**
   * 新建科室
   * @param {[type]} body [description]
   */
  departmentCreate(name: string){
    return this._apiService.postParma(`${PATH.departmentCreate}?name=${name}`);
  }

  /**
   * 编辑科室
   * @param {[type]} body [description]
   */
  departmentEdit(departmentId: number, name: string){
    return this._apiService.postParma(`${PATH.departmentEdit}?departmentId=${departmentId}&name=${name}`);
  }
  
}