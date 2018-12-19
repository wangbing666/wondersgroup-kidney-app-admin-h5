import { Injectable } from "@angular/core";

import { PATH } from '../../../services/api-url';
import { ApiService } from '../../../services/api';

@Injectable()
export class FeedbackService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取用户反馈列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getFeedback(page: number, size: number) {
    return this._apiService.get(`${PATH.feedback}?page=${page}&size=${size}`);
  }
}