import { Injectable } from "@angular/core";

import { PATH } from '../../../../services/api-url';
import { ApiService } from '../../../../services/api';

@Injectable()
export class UserOrderService {

  constructor(private _apiService: ApiService) {}

  getUserOrders(page: number, size: number) {
    return this._apiService.get(`${PATH.userOrder}?page=${page}&size=${size}`);
  }

  getRefundOrders() {
    return this._apiService.get(`${PATH.orderRefundList}?executionStatus=2&refunded=false`);
  }

  getUntreatedOrders() {
    return this._apiService.get(`${PATH.orderService}`);
  }

  userOrderRefund(id: number) {
    return this._apiService.get(`${PATH.userOrder}/${id}`);
  }

  userOrderTreat(id: number) {
    return this._apiService.get(`${PATH.orderService}/${id}`);
  }

}
