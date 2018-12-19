import { Injectable ,Inject} from "@angular/core";

import { PATH } from '../../../services/api-url';
import { ApiService } from '../../../services/api';

@Injectable()
export class OperationPushService {

  constructor(@Inject('api') public api, private _apiService: ApiService) {}

  /**
   * 推送列表
   */
  getOperationPush(typeId:number,size:number,page:number) {
    return this._apiService.getURL(`${this.api.CAN_URL}${PATH.operationPush}/${typeId}?size=${size}&page=${page}`);
  }

 /**
  * 新增推送
  * @param {[type]} body [description]
  */
  operationPushSave(data){
    return this._apiService.postURL(`${this.api.CAN_URL}${PATH.operationPushSave}`, data);
  }

   /**
  * 编辑推送
  * @param {[type]} body [description]
  */
  operationPushUpdate(data){
    return this._apiService.putURL(`${this.api.CAN_URL}${PATH.operationPushUpdate}`, data);
  }

  /**
  * 发送推送
  * @param {[type]} body [description]
  */
  operationPushSend(pushId:number){
    return this._apiService.postParmaURL(`${this.api.CAN_URL}${PATH.operationPushSend}?pushId=${pushId}`);
  }

  /**
  * 删除推送
  * @param {[type]} body [description]
  */
  operationPushDelete(pushId:number){
    return this._apiService.deleteURL(`${this.api.CAN_URL}${PATH.operationPushDel}?pushId=${pushId}`);
  }

  /**
  * 跳转APP页面
  * @param {[type]} body [description]
  */
  operationPushApp(){
    return this._apiService.getURL(`${this.api.CAN_URL}${PATH.operationPushApp}`);
  }
}