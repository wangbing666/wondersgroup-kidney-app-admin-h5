import { Injectable } from "@angular/core";

import { PATH } from '../../../services/api-url';
import { ApiService } from '../../../services/api';

@Injectable()
export class HealthNewsService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取患者新闻资讯类型列表
   */
  getHealthNewsType() {
    return this._apiService.get(`${PATH.newsClassifyList}`);
  }

  /**
   * 获取患者新闻资讯列表
   * @param {[type]} body [description]
   */
  getHealthNews(typeId: number, page: number, size: number) {
    return this._apiService.get(`${PATH.healthNewsList}?postoperativeClassificationId=${typeId}&page=${page}&size=${size}`);
  }

  /**
   * 新建患者新闻资讯
   * @param {[type]} body [description]
   */
  healthNewsCreate(data) {
    return this._apiService.post(`${PATH.healthNewsCreate}`, data);
  }

  /**
   * 编辑患者新闻资讯
   * @param {[type]} body [description]
   */
  healthNewsUpdate(data) {
    return this._apiService.post(`${PATH.healthNewsUpdate}`, data);
  }

  /**
   * 删除患者新闻资讯
   * @param {[type]} body [description]
   */
  healthNewsDelete(id: number) {
    return this._apiService.delete(`${PATH.healthNewsDelete}?postoperativeRecoveryId=${id}`);
  }

    /**
   * 配置阅读量参数
   * @param {[type]} body [description]
   */
  healthNewsReading(data) {
    return this._apiService.post(`${PATH.configurationReading}`,data);
  }

  /**
   * 配置点赞量参数
   * @param {[type]} body [description]
   */
  healthNewsThumb(data) {
    return this._apiService.post(`${PATH.configurationThumb}`,data);
  }

  /**
   * 获取医生端健康资讯
   * @param {[type]} body [description]
   */
  getDoctorHealthNews(page: number, size: number) {
    return this._apiService.get(`${PATH.healthNewsDoctor}?size=${size}&page=${page}`);
  }

  /**
   * 新建医生健康资讯
   * @param {[type]} body [description]
   */
  healthNewsDoctorCreate(data) {
    return this._apiService.post(`${PATH.healthNewsDoctorCreate}`, data);
  }

  /**
   * 编辑医生健康资讯
   * @param {[type]} body [description]
   */
  healthNewsDoctorUpdate(data) {
    return this._apiService.post(`${PATH.healthNewsDoctorUpdate}`, data);
  }

   /**
   * 删除医生健康资讯
   * @param {[type]} body [description]
   */
  healthNewsDoctorDelete(id: number) {
    return this._apiService.delete(`${PATH.healthNewsDoctorDelete}?id=${id}`);
  }

   /**
   * 查询点赞量参数和阅读量参数
   * @param {[type]} body [description]
   */
  getSetting() {
    return this._apiService.get(`${PATH.configurationSetting}`);
  }
}
