import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class DoctorTitleService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取职称列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getDoctorTitle() {
    return this._apiService.get(`${PATH.DoctorTitleList}`);
  }

  /**
   * 新建职称
   * @param {[type]} body [description]
   */
  DoctorTitleCreate(data){
    return this._apiService.post(`${PATH.DoctorTitleCreate}?name=${data.name}`,data);
  }

  /**
   * 编辑职称
   * @param {[type]} body [description]
   */
  DoctorTitleEdit(data){
    return this._apiService.post(`${PATH.DoctorTitleEdit}?doctorTitleId=${data.id}&name=${data.name}`,data);
  }

  /**
   * 删除职称
   * @param {[type]} body [description]
   */
  DoctorTitleDelete(id: number){
    return this._apiService.delete(`${PATH.DoctorTitleDelete}?doctorTitleId=${id}`);
  }

}