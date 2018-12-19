import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class HealthServiceService {

  constructor(private _apiService: ApiService) {}

  getHealthServices(page: number, size: number) {
    return this._apiService.get(`${PATH.PartyList}?page=${page}&size=${size}`);
  }

  getorganization() {
    return this._apiService.get(`${PATH.healthServiceList}`);
  }

  healthServiceCreate(body) {
    return this._apiService.post(`${PATH.thirdPartyCreate}`,body);
  }

  healthServiceDetails(id: number) {
    return this._apiService.get(`${PATH.thirdPartyDetails}/${id}`);
  }

  healthServiceEdit(id: number,body) {
    return this._apiService.put(`${PATH.thirdPartyEdit}/${id}`,body);
  }
}
