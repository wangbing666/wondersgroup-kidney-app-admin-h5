import { 
  Component, OnInit, AfterViewInit, 
  Input, Output, EventEmitter, 
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
// const Flatpickr = require('flatpickr');

import { DataCollectionService } from '../../_service';

import { Collection, Inspection, Image, Medicine, InspectionFormList } from '../data-collection.entity';

const typeList = ['检验报告', '出院小结', '影像资料', '用药清单', '就诊记录', '其他'];

declare let $: any;
// declare let require: any;
// declare var flatpickr: any;

@Component({
  selector: 'app-edit-form',
  templateUrl: 'edit-form.component.html',
  styleUrls: ['../../data-collection.component.css']
})
export class EditFormComponent implements OnInit, AfterViewInit {
  @Input() id;
  @Input() editFormData: Collection;
  @Input() images: any[];
  @Input() index;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();
  @Output() saveSuccess: EventEmitter<any> = new EventEmitter();
  @Output() cancelEmmiter: EventEmitter<any> = new EventEmitter();

  info: Collection = new Collection();
  imageList = [];
  typeList = typeList;

  recordPhotos: Array<number> = [];

  inspectionFormList: InspectionFormList[] = [];
  medicineFormList: Medicine[] = [];
  imageFormList: Image[] = [];

  enableShow: boolean = false;
  message: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private _dataCollectionService: DataCollectionService
  ) {

  }

  ngOnInit() {
    this.info = this.editFormData;
    // console.log(this.info);
    this.images.forEach(obj => {
      this.imageList.push({ id: obj.id, imgUrl: obj.imgUrl, checked: false });
    })
    this.recordPhotos = (this.info.medicalRecordPhotoList &&
                         this.info.medicalRecordPhotoList.length !== 0) ?
                         this.info.medicalRecordPhotoList : [];

    if(this.info.InspectionFormList&&this.info.InspectionFormList.length!==0) {
      this.inspectionFormList = this.info.InspectionFormList;
    }

    if(this.info.recordPrescriptionMedicineList&&this.info.recordPrescriptionMedicineList.length!==0){
      this.info.recordPrescriptionMedicineList.forEach((obj) => {
        this.medicineFormList.push(obj);
      })
    } 

    if(this.info.recordImagingReportList&&this.info.recordImagingReportList.length!==0){
      this.info.recordImagingReportList.forEach((obj) => {
        this.imageFormList.push(obj);
      })
    } 
  }

  ngAfterViewInit() {
    // console.log(this.index);
    setTimeout(() => {
      this.resetImages(this.imageList, this.recordPhotos);
      $('.ui.checkbox').checkbox();
    }, 0);
    // console.log("checkDate" + this.index);

    $("#checkDate" + this.index).flatpickr({
      "locale": "zh",
      "defaultDate": this.info.checkDate || ''
    });
    $("#inTime" + this.index).flatpickr({
      "locale": "zh",
      "defaultDate": this.info.inTime || ''
    });
    $("#outTime" + this.index).flatpickr({
      "locale": "zh",
      "defaultDate": this.info.outTime || ''
    });
    $("#writeTime" + this.index).flatpickr({
      "locale": "zh",
      "defaultDate": this.info.writeTime || ''
    });
    this.cdr.detectChanges();
    // $('#recordHistoryType').dropdown({
    //   placeholder: typeList[this.data.content.recordHistoryType-1] || '',
    // });
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

  resetImages(images: Array<any>, recordList: Array<number>) {
    images.forEach(obj => {
      if (recordList.indexOf(parseInt(obj.id)) > -1) {
        obj.checked = true;
      }
    })
  }

  getChecked(div, value) {
    let i = this.recordPhotos.indexOf(parseInt(value));
    if(i < 0) {
      this.recordPhotos.push(value);
    } else {
      this.recordPhotos.splice(i, 1);
    }
    this.info.medicalRecordPhotoList = this.recordPhotos;
    this.saveAsDraft();
  }

  newInspectionForm() {
    this.inspectionFormList.push(new InspectionFormList());
    this.info.InspectionFormList = this.inspectionFormList;
    this.saveAsDraft();
  }

  delInspectionForm(i) {
    if(this.inspectionFormList[i].list[0].id){
      this.inspectionFormList[i].deleted = true;
    } else {
      this.inspectionFormList.splice(i, 1);
    }
    this.info.InspectionFormList = this.inspectionFormList;
    this.saveAsDraft();
  }

  reInspectionForm(i) {
    this.inspectionFormList[i].deleted = false;
    this.info.InspectionFormList = this.inspectionFormList;
    this.saveAsDraft();
  }

  newImageForm() {
    this.imageFormList.push(new Image());
    this.info.recordImagingReportList = this.imageFormList;
    this.saveAsDraft();
  }

  delImageForm(i) {
    if(this.imageFormList[i].id){
      this.imageFormList[i].deleted = true;
    } else {
      this.imageFormList.splice(i, 1);
    }
    // this.imageFormList.splice(i, 1);
    this.info.recordImagingReportList = this.imageFormList;
    this.saveAsDraft();
  }

  reImageForm(i) {
    this.imageFormList[i].deleted = false;
    this.info.recordImagingReportList = this.imageFormList;
    this.saveAsDraft();
  }

  newMedicineForm() {
    this.medicineFormList.push(new Medicine());
    this.info.recordPrescriptionMedicineList = this.medicineFormList;
    this.saveAsDraft();
  }

  delMedicineForm(i) {
    if(this.medicineFormList[i].id){
      this.medicineFormList[i].deleted = true;
    } else {
      this.medicineFormList.splice(i, 1);
    }
    // this.medicineFormList.splice(i, 1);
    this.info.recordPrescriptionMedicineList = this.medicineFormList;
    this.saveAsDraft();
  }

  reMedicineForm(i) {
    this.medicineFormList[i].deleted = false;
    this.info.recordPrescriptionMedicineList = this.medicineFormList;
    this.saveAsDraft();
  }

  saveAsDraft() {
    // console.log('save' + JSON.stringify(this.info));
    if(!this.info.id) {
      // console.log('saveAsDraft');
      this.dataChange.emit(this.info);
    }
  }

  changeType() {
    let data = this.info;
    this.info = new Collection();
    this.info.recordHistoryType = data.recordHistoryType;
    this.info.checkDate = data.checkDate || '';
    this.info.hospitalName = data.hospitalName || '';
    this.info.officeName = data.officeName || '';
    this.info.medicalRecordPhotoList = data.medicalRecordPhotoList || [];
    this.saveAsDraft();
  }

  save() {
    if(this.info.InspectionFormList) {
      this.info.recordExaminationItemList = [];
      this.info.InspectionFormList.forEach(obj => {
        obj.list.forEach(list => {
          list.itemId = obj.itemId;
          if(obj.deleted) {
            list.deleted = obj.deleted;
          }
        })
        this.info.recordExaminationItemList.push(...obj.list);
      })
      delete this.info.InspectionFormList;
    }
    if(this.info.recordPrescriptionMedicineList) {
      this.info.recordPrescriptionMedicineList.forEach(obj => {
        obj.startTime = (new Date(obj.startTime)).valueOf();
      });
    }
    if(!this.info.medicalRecordPhotoList || this.info.medicalRecordPhotoList.length == 0) {
      this.message = '请选择图片';
      this.enableShow = true;
    } else {
      // console.log("SaveData:"+JSON.stringify(this.info));
      this._dataCollectionService.dataCollectionCreate(this.id, this.info)
      .subscribe(res => {
        // console.log(res);
        if(res.code === 0) {
          this.saveSuccess.emit(this.info);
        } else {
          this.message = res.msg || '保存数据失败！';
          this.enableShow = true;
        }
      }, err => {
        this.message = '链接服务器出错啦～请重新保存！';
        this.enableShow = true;
      });
    }
  }

  cancel() {
    this.cancelEmmiter.emit();
  }

}