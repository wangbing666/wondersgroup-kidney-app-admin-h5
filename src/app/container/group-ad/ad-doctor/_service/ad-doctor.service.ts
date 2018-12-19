import { Injectable } from "@angular/core";

// import { PATH } from '../api-url';
import { ApiService } from '../../../../services/api';

const PATH = {
  adList: 'adsense/findAllAdsense', //GET
  adNew: 'adsense/save', //POST
  adDelete: 'deleteAdsense', //DELETE deleteAdsense/{adsenseId}
  adEdit: 'adsense/update', //PUT
  adStatus: 'adsense/changeStatus', //POST, /adsense/changeStatus/{adsenseId}/{status}
}

@Injectable()
export class AdDoctorService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取广告列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getAdList(page: number) {
    return this._apiService.get(`${PATH.adList}?size=10&page=${page}`);
  }

  /**
   * 新增广告
   */
  adNew(data){
    return this._apiService.post(`${PATH.adNew}`,data);
  }

  /**
   * 编辑广告
   */
  adEdit(data){
    return this._apiService.post(`${PATH.adEdit}`,data);
  }

  /**
   * 删除广告
   */
  adDelete(id){
    return this._apiService.delete(`${PATH.adDelete}/${id}`);
  }

  /**
   * 广告上下架
   */
  adStatus(id, status){
    let data = null;
    return this._apiService.post(`${PATH.adStatus}/${id}/${status}`, data);
  }

}