import { Injectable, Inject } from '@angular/core';

import { ApiService } from '../../../../services'; 

const PATH = {
  inspectionCategory: 'record/examination/type',
  inspectionItem: 'record/examination/item'
}

@Injectable()
export class InspectionItemService {
  
  constructor(private _apiService: ApiService) {}

  getInspectionCategories() {
    return this._apiService.getURL(`${this._apiService.api.COMMON_URL}${PATH.inspectionCategory}`);
  }

  getInspectionItems(page: number, size: number, type: number) {
    return this._apiService.getURL(`${this._apiService.api.COMMON_URL}${PATH.inspectionItem}?page=${page}&size=${size}&type=${type}`);
  }

  inspectionItemCreate(data) {
    return this._apiService.postURL(`${this._apiService.api.COMMON_URL}${PATH.inspectionItem}`, data);
  }

  inspectionItemEdit(data) {
    return this._apiService.putURL(`${this._apiService.api.COMMON_URL}${PATH.inspectionItem}/${data.id}`, data);
  }

  inspectionItemDelete(id) {
    return this._apiService.deleteURL(`${this._apiService.api.COMMON_URL}${PATH.inspectionItem}/${id}`);
  }

}