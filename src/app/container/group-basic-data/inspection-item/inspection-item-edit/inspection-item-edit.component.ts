import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { InspectionItemService } from '../_service';

declare var $: any;

@Component({
  selector: 'app-inspection-item-edit',
  templateUrl: 'inspection-item-edit.component.html',
  styleUrls: ['inspection-item-edit.component.css']
})
export class InspectionItemEditComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Input() inspectionType: any;
  @Output() enableChange: EventEmitter <any> = new EventEmitter();
  @Output() handleEmit: EventEmitter <any> = new EventEmitter();

  modalTitle: string;
  errorMessage: string;

  myForm: FormGroup;
  selectedType: any;
  selectedChart: any;
  typeOption = [
    {
      id: 0,
      name: '无'
    },
    {
      id: 1,
      name: '范围'
    }
  ];
  chartOption = [
    {
      id: 'true',
      name: '可显示图表'
    },
    {
      id: 'false',
      name: '无图表'
    }
  ];

  constructor(
    private _inspectionItemService: InspectionItemService, 
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.setInspectionItemForm();
  }

  ngAfterViewInit() {
    $('#inspectionType').dropdown();
    $('#typeOption').dropdown();
    $('#chartOption').dropdown();
  }

  setInspectionItemForm() {
    if (this.data) {
      this.modalTitle = "编辑检查子项目";
      this.selectedType = this.data.type;
      this.selectedChart = this.data.chart == false ? 'false' : 'true' || '';
    } else {
      this.modalTitle = "新增检查子项目";
    }
    this.myForm = new FormGroup({
      recordExaminationTypeId: new FormControl(this.data && this.data.recordExaminationTypeId || '',
        Validators.compose([
          Validators.required
        ])),
      name: new FormControl(this.data && this.data.name || '',
        Validators.compose([
          Validators.required
        ])),
      alias: new FormControl(this.data && this.data.alias || ''),
      unit: new FormControl(this.data && this.data.unit || ''),
      type: new FormControl(this.data && (this.data.type == 0 ? this.data.type : this.data.type || ''),
        Validators.compose([
          Validators.required
        ])),
      reference: new FormControl(this.data && (this.data.reference == 0 ? this.data.reference : this.data.reference || '')),
      max: new FormControl(this.data && (this.data.max == 0 ? this.data.max : this.data.max || '')),
      min: new FormControl(this.data && (this.data.min == 0 ? this.data.min : this.data.min || '')),
      chart: new FormControl(this.data && (this.data.chart == false ? 'false' : 'true' || ''),
        Validators.compose([
          Validators.required
        ])),
      maxY: new FormControl(this.data && (this.data.maxY == 0 ? this.data.maxY : this.data.maxY || '')),
      minY: new FormControl(this.data && (this.data.minY == 0 ? this.data.minY : this.data.minY || '')),
      intervalY: new FormControl(this.data && (this.data.intervalY == 0 ? this.data.intervalY : this.data.intervalY || '')),
      color: new FormControl(this.data && this.data.color || '#35B2F2'),
    });
  }

  getValue(value) {
    value.chart = value.chart == 'true' ? true : false;
    if (this.data) {
      value.id = this.data.id;
      // console.log(value);
      this._inspectionItemService.inspectionItemEdit(value)
        .subscribe(
          res => {
            if (res.code === 0) {
              this.handleEmit.emit("检查子项目修改成功！");
              this.close();
            } else {
              if(res.msg) {
                this.errorMessage = res.msg;
              } else {
                this.errorMessage = "保存失败～请重新操作！";
              }
            }
          }, err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
          })

    } else {
      this._inspectionItemService.inspectionItemCreate(value)
        .subscribe(
          res => {
            if (res.code === 0) {
              this.handleEmit.emit("检查子项目保存成功！");
              this.close();
            } else {
              if(res.msg) {
                this.errorMessage = res.msg;
              } else {
                this.errorMessage = "保存失败～请重新操作！";
              }
            }
          }, err => {
            this.errorMessage = "啊哦！接口访问出错啦～";
          })
    }
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }


  isValid(type) {
    return this.myForm.controls[type].valid;
  }

}