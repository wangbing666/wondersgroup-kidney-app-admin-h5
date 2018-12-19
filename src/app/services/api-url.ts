export const PATH = {

  login: 'admin/login', // 登陆

  upload: 'uploads/uploadKidney', // 上传图片

  doctorAuditedList: 'doctor/find/success', // 医生信息审核通过列表
  doctorAuditingList: 'doctor/find/assessing', // 医生信息待审核列表
  doctorFailureList: 'doctor/find/failure', // 医生信息审核失败列表
  doctorTitleImg: 'doctor/find/titleImg', // 查看医生职称证明或工牌
  doctorCreate: 'doctor/save', // 新增医生
  doctorAuditedUpdate: 'doctor/update', // 编辑审核通过和审核中的医生信息
  doctorAuditingUpdate: 'doctor/update/failure', // 编辑审核失败的医生信息
  doctorAssess: 'doctor/assess', // 医生信息审核通过
  doctorFailure: 'doctor/fail', // 医生信息审核不通过
  doctorOptionList: 'doctor/department/find', // 查询医生信息新增／编辑选项列表
  sendMessage: 'doctor/sendMsg', // 编辑短信提醒医生
  doctorCount: 'doctor/count/assessing', // 待审核医生数目
  doctorIntegral:'pointRecord/find/doctor',//查询医生积分明细

  hospital: 'hospital', //医院列表
  kideny: "kidneySource/find", //肾源列表

  userList: 'user/findAll', // 查询患者信息列表
  userCreate: 'user/save', // 新增患者
  userUpdate: 'user/update', // 编辑患者信息
  userSearch: 'user/search',//搜索患者
  UserIntegral:'pointRecord/find/user',//查询患者积分明细

  departmentList: 'department/find', // 科室列表
  departmentCreate: 'department/save', // 新增科室
  departmentEdit: 'department/update', // 编辑科室
  departmentDelete: 'department/delete', // 删除科室

  symptom: 'symptom', // 不适症状
  symptomType: 'symptomcategory', // 不适症状类型

  feedback: 'feedback/find', // 用户反馈

  drugList: 'BackstageMedicine/queryMedicine', // 药品列表
  drugUpdate: 'BackstageMedicine/updateDrugs', // 编辑药品
  drugSave: 'BackstageMedicine/saveDrugs', // 新增药品

  PartyList: 'thirdparty/service', // 第三方服务列表
  thirdPartyCreate: 'thirdparty/service', // 新增机构信息
  thirdPartyEdit: 'thirdparty/service', // 编辑机构信息
  healthServiceList: 'thirdparty/organization/abstract', // 查询第三方机构列表
  thirdPartyDetails: 'thirdparty/service', // 查询第三方服务详情

  thirdParty: 'thirdparty/organization', // 第三方机构

  serviceSpecificationList: 'api/healthServiceSpecification/list', // 查询服务规格列表
  serviceSpecificationCreate: 'api/healthServiceSpecification/save', // 新增服务规格
  serviceSpecificationUpdate: 'api/healthServiceSpecification/update', // 修改服务规格

  doctorGroupList: 'doctorServiceAuditPass/get', // 查询所有医生小组
  auditingServiceList: 'doctorServicePendingAudit/get', // 查询待审核服务列表
  doctorGroupOrderDetail: 'doctorServiceAuditPass/getDetails/', // 查询服务明细列表
  auditingServiceSuccess: 'doctorServicePendingAudit/update', // 审核服务 
  doctorServiceCount: 'doctorServicePendingAudit/getCount', // 查询未审核医生小组服务

  doctorServiceList: 'doctorService/getServiceInfoName', // 医生服务列表
  doctorServiceAdd: 'doctorService/save', // 新增医生服务
  doctorServiceEdit: 'doctorService/update', // 编辑医生服务

  doctorAccount: 'account/doctor', // 医生账户管理
  withdrawDeposit: 'account/doctor/withdraw', // 医生账户提现管理

  userOrder: 'order', // 用户订单管理
  orderRefundList: 'order/subset', // 获取所有待退款订单
  orderService: 'order/thirdparty', // 第三方服务订单
  orderRefundCount: 'order/refund/latest/count', // 待退款订单数目
  orderServiceCount: 'order/thirdparty/latest/count', // 未处理第三方服务数目
  userOrderCount: 'order/latest/count', // 用户订单管理未处理信息数目

  newsClassifyList: 'postoperativeCassification/get', // 查询所有健康咨询分类
  newsClassifyCreate: 'postoperativeCassification/save', // 新增健康咨询分类
  newsClassifyUpdate: 'postoperativeCassification/update', // 修改健康咨询分类

  configurationThumb: 'admin/savePraiseCountSetting',//配置点赞量参数
  configurationReading:'admin/saveReadingQuantitySetting',//配置阅读量参数
  configurationSetting: 'admin/getSetting',//查询阅读量参数和点赞量参数
  healthNewsDoctor: 'doctorInformation/getDoctorInformation',//查询医生健康资讯
  healthNewsDoctorCreate: 'doctorInformation/save', // 新增医生健康咨询
  healthNewsDoctorUpdate: 'doctorInformation/update', // 修改生健康咨询
  healthNewsDoctorDelete: 'doctorInformation/delete', // 删除医生健康咨询
  healthNewsList: 'postoperative/get', // 查询患者健康咨询
  healthNewsCreate: 'postoperative/save', // 新增患者健康咨询
  healthNewsUpdate: 'postoperative/update', // 修改患者健康咨询
  healthNewsDelete: 'postoperative/deletePostoperativeRecovery', // 删除患者健康咨询

  DoctorTitleList: 'doctorTitle/find', // 职称列表
  DoctorTitleCreate: 'doctorTitle/save', // 新增职称
  DoctorTitleEdit: 'doctorTitle/update', // 修改职称
  DoctorTitleDelete: 'doctorTitle/delete', // 删除职称

  operationPush: "push/find",//推送列表
  operationPushSave:"push/save",//新增推送
  operationPushUpdate:"push/update",//编辑推送
  operationPushSend:"push/sendPush",//发送推送
  operationPushDel:"push/delete",//删除推送
  operationPushApp:"push/findJumpPage",//跳转APP页面

  pushTime: "publicPushTime/find",//查询推送时间
  pushTimeEdit: "publicPushTime/update",//编辑推送时间

  integralCommodityDelete: "mall/delete", //删除商品
  integralCommodityEnabled: "mall/enabled", //上下架
  integralCommodityList: "mall/findAll", //查询所有商品
  integralCommodityEdit: "mall/save", //新增编辑商品
  integralCommodityType: "mall/type", //查询状态

  integralOrderList: "mallOrder/find", //商品兑换管理
  integralOrderExpress: "mallOrder/findCompany", //查询快递公司
  integralOrderCount: "mallOrder/findWaitingCount", //查询商品兑换管理-待处理数量
  integralOrderSend: "mallOrder/sendMsg", //发送短信

  integralDetailList: "pointRecord/find", //查询积分记录
  integralOrderSearch: "pointRecord/search", //姓名/手机号/项目搜索

  //数据统计
  userRegister: 'register/find/user',//注册量统计
  doctorRegister: 'register/find/doctor',
  businessData: 'businessData/find',//业务数据统计
  userDaily: 'loginStatistics/getUser',//患者日活跃度统计
  doctorDaily: 'loginStatistics/getDoctor',
  userPeriodStatistics: 'loginStatistics/getUserStatistics',//患者时间段活跃度统计
  doctorPeriodStatistics: 'loginStatistics/getDoctorStatistics',
  serviceData: 'serviceData/find',//服务数据统计
  
}
