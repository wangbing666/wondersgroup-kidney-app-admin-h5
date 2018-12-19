import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class UserService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取通过审核的医生列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getUsers(page: number, size: number) {
    return this._apiService.get(`${PATH.userList}?size=${size}&page=${page}`);
  }

/**
   * 获取肾源和医院
   */
  getKidney(){
    return this._apiService.get(`${PATH.kideny}`);
  }


  /**
   * 新建医生
   * @param {[type]} body [description]
   */
  userCreate(body){
    return this._apiService.post(`${PATH.userCreate}`, body);
  }

  /**
   * 更新审核通过的医生信息
   * @param {[type]} body [description]
   */
  userUpdate(body){
    return this._apiService.post(`${PATH.userUpdate}`,body);
  }

  /**
   * 查询患者积分明细
   * @param {any} body [description]
   */
  getuserIntegral(userId:number,size:number,page:number) {
    return this._apiService.get(`${PATH.UserIntegral}/${userId}?size=${size}&page=${page}`);
  }
  
  /**
   * 搜索患者
   * @param {any} body [description]
   */
  getuserSearch(item:any,size:number,page:number) {
    return this._apiService.get(`${PATH.userSearch}?item=${item}&size=${size}&page=${page}`);
  }
}
