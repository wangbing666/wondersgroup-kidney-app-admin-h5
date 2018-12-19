import { Injectable, Inject } from "@angular/core";

import { PATH } from '../api-url';
import { ApiService } from '../api';

declare let $: any;

@Injectable()
export class CommonService {

  constructor(@Inject('api') private api, private _apiService: ApiService) {}

  // 获取登陆ID
  getId() {
    let admin = JSON.parse(window.sessionStorage.getItem('kidney_login_info'));
    return admin && admin.id || '';
  }

  // 获取登陆名
  getName() {
    let admin = JSON.parse(window.sessionStorage.getItem('kidney_login_info'));
    return admin && admin.username || '';
  }

  /**
   * 上传图片(使用回调函数返回值)
   * @param data
   * @returns {string}
   */
  uploadFile(data: FormData, callback) {
    $.ajax({
      url: `${this.api.BASE_URL}${PATH.upload}`,
      type: 'POST',
      beforeSend: request => {
        request.setRequestHeader("access-token", window.sessionStorage.getItem('kidney_access_token'));
      },
      data: data,
      cache: false,
      contentType: false, //不可缺
      processData: false, //不可缺
      success: function(data) {
        callback.UploadSuccess(data);
      },
      error: function(err) {
        callback.UploadFailure(err);
      }
    });
  }

}
