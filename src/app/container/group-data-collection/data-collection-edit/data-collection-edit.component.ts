import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormControl } from '@angular/forms';

import { DataCollectionService, DataCollectionDetailService } from '../_service';

import { Collection, Inspection, Image, Medicine, InspectionFormList } from './data-collection.entity';

import { EditFormComponent } from './editForm';

declare let localStorage: any;
declare let history: any;
declare let document: any;
declare let $: any;

@Component({
  selector: 'app-data-collection-edit',
  templateUrl: 'data-collection-edit.component.html',
  styleUrls: ['../data-collection.component.css']
})
export class DataCollectionEditComponent implements OnInit {
  title = '病史资料录入';
  subTitle = '患者信息录入';

  userInfo: any;
  errorMessage: string;

  commonList: any;

  collectionInput: Collection;
  medicineInput: Medicine[];
  InspectionInput: Inspection[];

  editFormList: Collection[] = [];

  enableShow: boolean = false;
  message: string;

  passEnable = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private elementRef: ElementRef,
    private _dataCollectionService: DataCollectionService,
    private _dataCollectionDetailService: DataCollectionDetailService
   ) {

  }

  ngOnInit() {
    this.getTitle();
    this.getDataCollection();
  }

  resetData() {
    this.userInfo = null;
    this.errorMessage = '';
  }

  getTitle() {
    this.commonList = this._dataCollectionDetailService.setCommonList();
  }

  setUpdateData(data, type) {
    let updateData = new Collection();
    if(type === 1 && data.id) {
      updateData.id = data.id;
      updateData.recordHistoryType = data.recordHistoryType || '';
      updateData.checkDate = data.checkDate || '';
      updateData.hospitalName = data.hospitalName || '';
      updateData.officeName = data.officeName || '';
      updateData.medicalRecordPhotoList = this.getImageList(data.medicalRecordPhotoList) || [];

      updateData.InspectionFormList = [];
      if(data.object && data.object.recordExaminationItemList) {
        data.object.recordExaminationItemList.forEach(obj => {
          updateData.InspectionFormList.push(new InspectionFormList(
            {
              itemId: obj.id,
              list: obj.examinationItemList || []
            }
          ));
        });
      }
    }

    if(type === 2 && data.id) {
      updateData.id = data.id || '';
      updateData.recordHistoryType = data.recordHistoryType || '';
      updateData.checkDate = data.checkDate || '';
      updateData.hospitalName = data.hospitalName || '';
      updateData.officeName = data.officeName || '';
      updateData.medicalRecordPhotoList = this.getImageList(data.medicalRecordPhotoList) || [];

      updateData.InspectionFormList = [];
      if(data.object && data.object.recordExaminationItemList) {
        data.object.recordExaminationItemList.forEach(obj => {
          updateData.InspectionFormList.push(new InspectionFormList(
            {
              itemId: obj.id,
              list: obj.examinationItemList || []
            }
          ));
        });
      }
      updateData.recordPrescriptionMedicineList = data.object && data.object.recordPrescriptionMedicineList || [];
      // updateData.recordPrescriptionMedicineList.forEach(obj => {
      //   obj.startTime = new Date(obj.startTime);
      // })
      updateData.recordImagingReportList = data.object && data.object.recordImagingReportList || [];

      updateData.hospitalNo = data.object && data.object.hospitalNo || '';
      updateData.pathobiologyNo = data.object && data.object.pathobiologyNo || '';
      updateData.xrayNo = data.object && data.object.xrayNo || '';
      updateData.bedNo = data.object && data.object.bedNo || '';
      updateData.sectionOffice = data.object && data.object.sectionOffice || '';
      updateData.inTime = data.object && data.object.inTime || '';
      updateData.outTime = data.object && data.object.outTime || '';
      updateData.cause = data.object && data.object.cause || '';
      updateData.diagnosis = data.object && data.object.diagnosis || '';
      updateData.briefHistoryName = data.object && data.object.briefHistoryName || '';
      updateData.briefHistoryChief = data.object && data.object.briefHistoryChief || '';
      updateData.briefHistoryPresent = data.object && data.object.briefHistoryPresent || '';
      updateData.briefHistoryPast = data.object && data.object.briefHistoryPast || '';
      updateData.physicalTemperature = data.object && data.object.physicalTemperature || '';
      updateData.physicalPulse = data.object && data.object.physicalPulse || '';
      updateData.physicalRespiration = data.object && data.object.physicalRespiration || '';
      updateData.physicalBloodPressureDiastolic = data.object && data.object.physicalBloodPressureDiastolic || '';
      updateData.physicalBloodPressureSystolic = data.object && data.object.physicalBloodPressureSystolic || '';
      updateData.physicalExamination = data.object && data.object.physicalExamination || '';
      updateData.treatmentCondition = data.object && data.object.treatmentCondition || '';
      updateData.treatmentResult = data.object && data.object.treatmentResult || '';
      updateData.leaveCondition = data.object && data.object.leaveCondition || '';
      updateData.leaveSuggestion = data.object && data.object.leaveSuggestion || '';
      updateData.physicianChief = data.object && data.object.physicianChief || '';
      updateData.physicianAttending = data.object && data.object.physicianAttending || '';
      updateData.physicianResident = data.object && data.object.physicianResident || '';
      updateData.physicianIntern = data.object && data.object.physicianIntern || '';
      updateData.writeTime = data.object && data.object.writeTime || '';
      updateData.deleted = data.object && data.object.deleted || '';
    }

    if(type === 3 && data.id) {
      updateData.id = data.id;
      updateData.recordHistoryType = data.recordHistoryType || '';
      updateData.checkDate = data.checkDate || '';
      updateData.hospitalName = data.hospitalName || '';
      updateData.officeName = data.officeName || '';
      updateData.medicalRecordPhotoList = this.getImageList(data.medicalRecordPhotoList) || [];
    }

    if(type === 4 && data.id) {
      updateData.id = data.id;
      updateData.recordHistoryType = data.recordHistoryType || '';
      updateData.checkDate = data.checkDate || '';
      updateData.hospitalName = data.hospitalName || '';
      updateData.officeName = data.officeName || '';
      updateData.medicalRecordPhotoList = this.getImageList(data.medicalRecordPhotoList) || [];
      updateData.recordPrescriptionMedicineList = data.object && data.object.recordPrescriptionMedicineList || [];
      // updateData.recordPrescriptionMedicineList.forEach(obj => {
      //   obj.startTime = new Date(obj.startTime);
      // })
    }

    if(type === 5 && data.id) {
      updateData.id = data.id;
      updateData.recordHistoryType = data.recordHistoryType || '';
      updateData.checkDate = data.checkDate || '';
      updateData.hospitalName = data.hospitalName || '';
      updateData.officeName = data.officeName || '';
      updateData.medicalRecordPhotoList = this.getImageList(data.medicalRecordPhotoList) || [];
      updateData.content = data.object && data.object.content || '';
    }

    if(type === 6 && data.id) {
      updateData.id = data.id;
      updateData.recordHistoryType = data.recordHistoryType || '';
      updateData.checkDate = data.checkDate || '';
      updateData.hospitalName = data.hospitalName || '';
      updateData.officeName = data.officeName || '';
      updateData.medicalRecordPhotoList = this.getImageList(data.medicalRecordPhotoList) || [];
      updateData.title = data.object && data.object.title || '';
    }
    return updateData;

  }

  getImageList(list: any[]) {
    let imgList = [];
    list.forEach(obj => {
      if(typeof obj == 'object'){
        imgList.push(parseInt(obj.id));
      } else {
        imgList.push(parseInt(obj))
      }
    })
    return imgList;
  }

  getDataCollection(){
    this.resetData();
    this.route.params.subscribe(params => {
      this.editFormList = this.getLocalStorage(`inputData${+params['id']}`);
      this._dataCollectionService.getDataCollection(+params['id'])
        .subscribe(res => {
          // console.log(res);
          if(res.code === 0 && res.data) {
            if(res.data.status == 1 || res.data.status == 3) {
              this.errorMessage = '该用户资料已录入哦！';
            } else {
              this.userInfo = res.data;
            }
          } else {
            if(res.msg) {
              this.errorMessage = res.msg;
            } else {
              this.errorMessage = '访问数据出错啦～';
            }
          }
        }, err => {
          this.errorMessage = '啊哦～访问接口出错啦～';
        })
    })
  }

  newForm() {
    this.editFormList.push(new Collection());
    this.setLocalStorage(`inputData${this.userInfo.id}`, this.editFormList);
  }

  dataChange(data, i) {
    this.editFormList[i] = data;
    this.setLocalStorage(`inputData${this.userInfo.id}`, this.editFormList);
  }

  delForm(i) {
    this.editFormList.splice(i, 1);
    this.setLocalStorage(`inputData${this.userInfo.id}`, this.editFormList);
  }

  setLocalStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
  }

  getLocalStorage(key) {
    if(localStorage[key]) {
      return JSON.parse(localStorage[key]);
    }
    return [];
  }

  toedit(ele) {
    ele.hidden = false;
  }

  tocancel(ele) {
    ele.hidden = true;
  }

  todel(obj) {
    let data = this.setUpdateData(obj, obj.recordHistoryType);
    if(data.InspectionFormList) {
      data.recordExaminationItemList = [];
      data.InspectionFormList.forEach(obj => {
        obj.list.forEach(list => {
          list.itemId = obj.itemId;
          if(obj.deleted) {
            list.deleted = obj.deleted;
          }
        })
        data.recordExaminationItemList.push(...obj.list);
      })
      delete data.InspectionFormList;
    }
    data.deleted = true;
    this._dataCollectionService.dataCollectionCreate(this.userInfo.id, data)
    .subscribe(res => {
      if(res.code === 0) {
        this.message = res.msg || '删除数据成功！';
        this.enableShow = true;
        this.getDataCollection();
      } else {
        this.message = res.msg || '删除数据失败！';
        this.enableShow = true;
      }
    }, err => {
      this.message = '链接服务器出错啦～请重新操作！';
      this.enableShow = true;
    });
  }

  toggle(ele, button) {
    let text = button.innerHTML;
    ele.hidden = !ele.hidden;
    button.innerHTML = (text == '展开详情') ? '收起详情' : '展开详情';
  }

  toPass() {
    this.passEnable = true;
  }

  toclose(ele) {
    ele.hidden = true;
  }

  done(res){
    this.passEnable = true;
    if(res.code == -1) {
      this.message = res.msg;
      this.enableShow = true;
    } else {
      this.router.navigate(['/data-collection']);
    }
  }

  saveSuccess(flagInfo) {
    this.message = '保存数据成功！';
    this.enableShow = true;
    let i = this.editFormList.indexOf(flagInfo);
    if(i > -1) {
      this.delForm(i);
    }
    this.getDataCollection();
  }

  goback() {
    history.go(-1);
  }

}