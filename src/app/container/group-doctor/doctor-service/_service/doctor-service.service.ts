import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class DoctorServiceService {

  constructor(private _apiService: ApiService) {}

  getDoctorGroups(page: number, size: number) {
    return this._apiService.get(`${PATH.doctorGroupList}?page=${page}&size=${size}`);
  }

  getAuditingServices(page: number, size: number) {
    return this._apiService.get(`${PATH.auditingServiceList}?page=${page}&size=${size}`);
  }

  getServiceDetails(id: number, page: number, size: number) {
    return this._apiService.get(`${PATH.doctorGroupOrderDetail}/${id}?size=${size}&page=${page}`);
  }

  serviceAuditingSuccess(id: number,body){
    return this._apiService.postParma(`${PATH.auditingServiceSuccess}/${id}?audit=${body}`);
  }
  
}
