import { Injectable } from '@angular/core';

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services';

@Injectable()
export class ServiceStatisticsService {

  constructor(private _apiService: ApiService) {}

  getData(obj: { startTime : string, endTime : string}) {
      return this._apiService.get(`${PATH.serviceData}?startTime=${obj.startTime}&endTime=${obj.endTime}`);
  }

}
