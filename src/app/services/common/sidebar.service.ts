import { Injectable, Inject } from '@angular/core';

import { Sidebar } from '../../entities';

import { ApiService } from '../api';
import { PATH } from '../api-url';

@Injectable()
export class SidebarService {

  private sidebars: Sidebar[] = SIDEBARS;

  constructor(@Inject('api') private api, private _apiSetvice: ApiService) {}

  initSidebars(path) {
    this.retsetSidebars();
    this.sidebars.forEach(obj => {
      if (obj.link === path) {
        obj.active = true;
      }
      if (obj.subBars) {
        obj.subBars.forEach(subObj => {
          if (subObj.link === path) {
            subObj.active = true;
            obj.open = true;
          }
        })
      }
    })
  }

  retsetSidebars() {
    this.sidebars.forEach(obj => {
      obj.active = false;
      obj.open = false;
      if (obj.subBars) {
        obj.subBars.forEach(subObj => {
          subObj.active = false;
        })
      }
    })
  }

  resetActive() {
    this.sidebars.forEach(obj => {
      obj.active = false;
      if (obj.subBars) {
        obj.subBars.forEach(subObj => {
          subObj.active = false;
        })
      }
    })
  }

  setCount(count, group, sub) {
    this.sidebars.forEach(obj => {
      if (obj.key === group) {
        obj.tag = 1;
      }
      if (obj.subBars) {
        obj.subBars.forEach(objS => {
          if (objS.key === sub) {
            objS.tag = count;
          }
        })
      }
    })
  }

  getSidebars(): Array < Sidebar > {
    return this.sidebars;
  }

  getDoctorCount() {
    return this._apiSetvice.get(`${PATH.doctorCount}`);
  }

  getDoctorGroupCount() {
    return this._apiSetvice.get(`${PATH.doctorServiceCount}`);
  }

  getDoctorAccountCount() {
    return this._apiSetvice.get(`${PATH.withdrawDeposit}/count?transactionStatus=0`);
  }

  getUserOrderCount() {
    return this._apiSetvice.get(`${PATH.userOrderCount}`);
  }

  getIntegralOrderCount(){
    return this._apiSetvice.get(`${PATH.integralOrderCount}`);
  }
}

let SIDEBARS = [
  new Sidebar({
    key: 'doctorgroup',
    title: '医生管理',
    ifSub: true,
    tag: 0,
    subBars: [
      new Sidebar({
        key: 'doctor',
        title: '医生信息管理',
        link: '/doctor',
        tag: 0
      }),
      new Sidebar({
        key: 'doctorservice',
        title: '医生服务管理',
        link: '/doctor-service',
        tag: 0
      }),
      new Sidebar({
        key: 'doctoraccount',
        title: '医生账户管理',
        link: '/doctor-account',
        tag: 0
      })
    ]
  }),
  new Sidebar({
    key: 'usergroup',
    title: '患者管理',
    ifSub: true,
    tag: 0,
    subBars: [
      new Sidebar({
        key: 'user',
        title: '患者信息管理',
        link: '/user'
      }),
      new Sidebar({
        key: 'userorder',
        title: '患者订单管理',
        link: '/user-order',
        tag: 0
      })
    ]
  }),
  new Sidebar({
    key: 'healthnews',
    title: '健康资讯管理',
    link: '/health-news'
  }),
  new Sidebar({
    key: 'servicegroup',
    title: '服务维护',
    ifSub: true,
    subBars: [
      new Sidebar({
        key: 'basicservice',
        title: '医生服务维护',
        link: '/basic-service'
      }),
      new Sidebar({
        key: 'healthservice',
        title: '第三方服务维护',
        link: '/health-service'
      }),
    ]
  }),
   new Sidebar({
    key: 'integral',
    title: '积分管理',
    ifSub: true,
    tag: 0,
    subBars: [
      new Sidebar({
        key: 'integralcommodity',
        title: '商品维护',
        link: '/integral-commodity'
      }),
      new Sidebar({
        key: 'integralorder',
        title: '商品兑换管理',
        link: '/integral-order',
        tag: 0
      }),
        new Sidebar({
        key: 'integraldetail',
        title: '积分管理',
        link: '/integral-detail',
      })
    ]
  }),
  new Sidebar({
    key: 'basicgroup',
    title: '基础数据维护',
    ifSub: true,
    subBars: [
      new Sidebar({
        key: 'hospital',
        title: '医院数据维护',
        link: '/hospital'
      }),
      new Sidebar({
        key: 'department',
        title: '科室数据维护',
        link: '/department'
      }),
      new Sidebar({
        key: 'doctortitle',
        title: '职称数据维护',
        link: '/doctor-title'
      }),
      new Sidebar({
        key: 'newsclassify',
        title: '健康资讯分类数据维护',
        link: '/news-classify'
      }),
      new Sidebar({
        key: 'discomfortsymptom',
        title: '不适症状数据维护',
        link: '/discomfort-symptom'
      }),
      new Sidebar({
        key: 'drug',
        title: '药品数据维护',
        link: '/drug'
      }),
      new Sidebar({
        key: 'healthorganization',
        title: '第三方机构数据维护',
        link: '/health-organization'
      }),
      new Sidebar({
        key: 'inspectioncategory',
        title: '检查类目维护',
        link: '/inspection-category'
      }),
      new Sidebar({
        key: 'inspectionitem',
        title: '检查子项目维护',
        link: '/inspection-item'
      }),
      new Sidebar({
        key: 'pushtime',
        title: '推送时间维护',
        link: '/push-time'
      }),
    ]
  }),
  new Sidebar({
    key: 'datacollection',
    title: '病史资料录入',
    link: '/data-collection'
  }),
  new Sidebar({
    key: 'operationpush',
    title: '运营推送',
    link: '/operation-push'
  }),
  new Sidebar({
    key: 'feedback',
    title: '用户反馈',
    link: '/feedback'
  }),
  new Sidebar({
    key: 'adgroup',
    title: '广告位管理',
    ifSub: true,
    subBars: [
      new Sidebar({
        key: 'addoctor',
        title: '广告位管理-医生端',
        link: '/ad-doctor'
      }),
    ]
  }),
  new Sidebar({
    key: 'statistics',
    title: '数据统计',
    ifSub: true,
    subBars: [
      new Sidebar({
        key: 'registerstatistics',
        title: '注册量统计',
        link: '/register-statistics'
      }),
      new Sidebar({
        key: 'activenessstatistics',
        title: '日活跃度统计',
        link: '/activeness-statistics'
      }),
      new Sidebar({
        key: 'periodstatistics',
        title: '活跃度统计',
        link: '/period-statistics'
      }),
      new Sidebar({
        key: 'businessstatistics',
        title: '业务数据统计',
        link: '/business-statistics'
      }),
      new Sidebar({
        key: 'servicestatistics',
        title: '服务数据统计',
        link: '/service-statistics'
      })
    ]
  }),
];
