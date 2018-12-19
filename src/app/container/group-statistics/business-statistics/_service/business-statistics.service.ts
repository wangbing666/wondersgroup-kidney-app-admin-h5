import { Injectable } from '@angular/core';

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services';

@Injectable()
export class BusinessStatisticsService {

  constructor(private _apiService: ApiService) {}

  getUserData(option: { startTime: string, endTime: string }){
    return this._apiService.get(`${PATH.businessData}?startTime=${option.startTime}&endTime=${option.endTime}&type=0`);
  }

  getDoctorData(option: { startTime: string, endTime: string }){
    return this._apiService.get(`${PATH.businessData}?startTime=${option.startTime}&endTime=${option.endTime}&type=1`);
  }

}