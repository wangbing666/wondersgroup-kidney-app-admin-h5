import { Injectable, Inject } from '@angular/core';

import { ApiService } from '../../../../services'; 

const PATH = {
  inspectionCategory: 'record/examination/type'
}

@Injectable()
export class InspectionCategoryService {
  
  constructor(private _apiService: ApiService) {}

  getInspectionCategories() {
    return this._apiService.getURL(`${this._apiService.api.COMMON_URL}${PATH.inspectionCategory}`);
  }

  inspectionCategoryCreate(data) {
    return this._apiService.postURL(`${this._apiService.api.COMMON_URL}${PATH.inspectionCategory}`, data);
  }

  inspectionCategoryEdit(data) {
    return this._apiService.putURL(`${this._apiService.api.COMMON_URL}${PATH.inspectionCategory}/${data.id}`, data);
  }

  inspectionCategoryDelete(id) {
    return this._apiService.deleteURL(`${this._apiService.api.COMMON_URL}${PATH.inspectionCategory}/${id}`);
  }

}