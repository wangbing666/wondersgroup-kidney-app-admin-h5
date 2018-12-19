import { Injectable } from '@angular/core';

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services';

@Injectable()
export class ActivenessStatisticsService {

  constructor(private _apiService: ApiService) {}

  getUserActiveness(obj: { page: number, key ? : string, date ? : string }) {
    if (obj.date && !obj.key) {
      return this._apiService.get(`${PATH.userDaily}?date=${obj.date}&page=${obj.page}`);
    } else if (!obj.date && obj.key) {
      return this._apiService.get(`${PATH.userDaily}?param=${obj.key}&page=${obj.page}`);
    } else if (obj.date && obj.key) {
      return this._apiService.get(`${PATH.userDaily}?param=${obj.key}&date=${obj.date}&page=${obj.page}`);
    } else {
      return this._apiService.get(`${PATH.userDaily}`);
    }
  }

  getDoctorActiveness(obj: { page: number , key ? : string, date ? : string }) {
    if (obj.date && !obj.key) {
      return this._apiService.get(`${PATH.doctorDaily}?date=${obj.date}&page=${obj.page}`);
    } else if (!obj.date && obj.key) {
      return this._apiService.get(`${PATH.doctorDaily}?param=${obj.key}&page=${obj.page}`);
    } else if (obj.date && obj.key) {
      return this._apiService.get(`${PATH.doctorDaily}?param=${obj.key}&date=${obj.date}&page=${obj.page}`);
    } else {
      return this._apiService.get(`${PATH.doctorDaily}`);
    }
  }

}
