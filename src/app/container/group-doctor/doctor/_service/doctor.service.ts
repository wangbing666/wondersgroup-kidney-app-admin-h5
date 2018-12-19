import { Injectable, Inject } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class DoctorService {

  constructor(@Inject('admin') private admin, private _apiService: ApiService) {}

  /**
   * 获取通过审核的医生列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getAuditedDoctors(page: number, size: number) {
    return this._apiService.get(`${PATH.doctorAuditedList}?page=${page}&size=${size}`);
  }

  /**
   * 获取待审核的医生列表
   * @param {number} page   [description]
   * @param {number} size   [description] 
   */
  getAuditingDoctors(page: number, size: number) {
    return this._apiService.get(`${PATH.doctorAuditingList}?page=${page}&size=${size}`);
  }

  /**
   * 获取审核失败的医生列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getFailureDoctors(page: number, size: number) {
    return this._apiService.get(`${PATH.doctorFailureList}?page=${page}&size=${size}`);
  }

  /**
   * 获取医生职称证明和医院工牌
   * @param {number} id [description]
   */
  getTitleImg(id: number) {
    return this._apiService.get(`${PATH.doctorTitleImg}?doctorId=${id}`);
  }

  /**
   * 获取选项列表
   */
  getOptions() {
    return this._apiService.get(`${PATH.doctorOptionList}`);
  }

  /**
   * 新建医生
   * @param {[type]} body [description]
   */
  doctorCreate(body) {
    return this._apiService.post(`${PATH.doctorCreate}`, body);
  }

  /**
   * 更新审核通过的医生信息
   * @param {[type]} body [description]
   */
  doctorUpdate(body) {
    return this._apiService.post(`${PATH.doctorAuditedUpdate}`, body);
  }

  /**
   * 更新审核失败的医生信息
   * @param {[type]} body [description]
   */
  doctorFailureUpdate(body) {
    return this._apiService.post(`${PATH.doctorAuditingUpdate}`, body);
  }

  /**
   * 通过医生审核
   * @param {number} id      [description]
   * @param {string} message [description]
   */
  doctorAuditingSuccess(id: number) {
    return this._apiService.post(`${PATH.doctorAssess}`, {
      assessor: this.admin.getName(),
      doctorId: id
    });
  }

  /**
   * 不通过医生审核
   * @param {number} id      [description]
   * @param {string} message [description]
   */
  doctorAuditingFailure(id: number, reason: string) {
    return this._apiService.post(`${PATH.doctorFailure}`, {
      assessor: this.admin.getName(),
      doctorId: id,
      refuseCause: reason
    });
  }

  /**
   * 编辑短信提醒医生
   * @param {any} body [description]
   */
  sendMessage(body: any) {
    return this._apiService.post(`${PATH.sendMessage}`, body);
  }

  /**
   * 查询医生积分明细
   * @param {any} body [description]
   */
  getdoctorIntegral(doctorId:number,size:number,page:number) {
    return this._apiService.get(`${PATH.doctorIntegral}/${doctorId}?size=${size}&page=${page}`);
  }

}
