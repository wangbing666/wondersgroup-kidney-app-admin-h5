import { Injectable, Inject } from '@angular/core';

import { ApiService } from '../../../services';

const PATH = {
  dataCollections: 'record/upload/list',
  dataCollection: 'record/upload',
  drug: 'BackstageMedicine/like'
}

@Injectable()
export class DataCollectionService {
  
  constructor(@Inject('api') private api,private _apiService: ApiService) {

  }

  getDataCollections(page, size, type) {
    return this._apiService.getURL(`${this.api.COMMON_URL}${PATH.dataCollections}?page=${page}&size=${size}&type=${type}`);
  }

  getDataCollection(id) {
    return this._apiService.getURL(`${this.api.COMMON_URL}${PATH.dataCollection}/${id}`);
  }

  dataCollectionCreate(id, data) {
    return this._apiService.postURL(`${this.api.COMMON_URL}${PATH.dataCollection}/${id}`, data);
  }

  statusChanged(id, data) {
    return this._apiService.putURL(`${this.api.COMMON_URL}${PATH.dataCollection}/${id}`, data);
  }

  getDrugs(key) {
    return this._apiService.get(`${PATH.drug}?name=${key}`);
  }

}