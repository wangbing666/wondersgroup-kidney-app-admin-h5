import { Injectable ,Inject} from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class PushTimeService {

  constructor(@Inject('api') public api, private _apiService: ApiService) {}

  /**
   * [getPackageServices description]
   */
  getPushTime() {
    return this._apiService.getURL(`${this.api.CAN_URL}${PATH.pushTime}`);
  }

 /**
  * [packageServiceSave description]
  * @param {[type]} body [description]
  */
  PushTimeEdit(pushId:number,pushTime:any){
  return this._apiService.postParmaURL(`${this.api.CAN_URL}${PATH.pushTimeEdit}?publicPushId=${pushId}&pushTime=${pushTime}`);
  }
}
