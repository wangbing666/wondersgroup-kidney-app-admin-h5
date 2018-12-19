import { Injectable } from '@angular/core';

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services';

@Injectable()
export class PeriodStatisticsService {

  constructor(private _apiService: ApiService) {}

  getUserResult(option: { startTime: string, endTime: string }){
    return this._apiService.get(`${PATH.userPeriodStatistics}?startDate=${option.startTime}&endDate=${option.endTime}`);
  }

  getDoctorResult(option: { startTime: string, endTime: string }){
    return this._apiService.get(`${PATH.doctorPeriodStatistics}?startDate=${option.startTime}&endDate=${option.endTime}`);
  }

}