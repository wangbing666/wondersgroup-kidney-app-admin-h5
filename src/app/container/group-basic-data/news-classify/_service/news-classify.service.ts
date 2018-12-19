import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class NewsClassifyService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取所有健康资讯分类列表
   */
  getNewsClassifies() {
    return this._apiService.get(`${PATH.newsClassifyList}`);
  }

  /**
   * 新增健康资讯分类
   * @param {[type]} name [description]
   */
  newsClassifyCreate(name) {
    return this._apiService.postParma(`${PATH.newsClassifyCreate}?name=${name}`);
  }

  /**
   * 更新健康资讯分类
   * @param {[type]} body [description]
   */
  newsClassifyUpdate(id, name) {
    return this._apiService.postParma(`${PATH.newsClassifyUpdate}/${id}?name=${name}`);
  }

}
