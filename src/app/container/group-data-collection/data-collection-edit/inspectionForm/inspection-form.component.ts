import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Collection, Inspection, Image, Medicine } from '../data-collection.entity';

import { InspectionItemService } from '../../../group-basic-data/inspection-item/_service';
import { InspectionCategoryService } from '../../../group-basic-data/inspection-category/_service';

@Component({
  selector: 'app-inspection-form',
  templateUrl: 'inspection-form.component.html'
})
export class InspectionFormComponent implements OnInit {
  @Input() id: any;
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  info: any;

  inspectionType: any;
  inspectionList: any;
  selectedType = null;

  inspectionFormList: Inspection[] = [];

  constructor(
    private _inspectionItemService: InspectionItemService,
    private _inspectionCategoryService: InspectionCategoryService
  ) {}

  ngOnInit() {
    this.getInspectionCategories();

    this.info = this.data;
    // console.log('inspection-form:'+JSON.stringify(this.info));

    // if(this.info.list) {
    //   this.inspectionFormList = this.info.list;
    // }
    this.selectedType = this.info&&this.info.itemId || null;
    if(this.selectedType) {
      if(this.info&&this.info.list!==0){
        this.inspectionType = this.info.list;
      }else {
        this.getInspectionItems(this.selectedType);
      }
    }
  }

  saveAsDraft(){
    if(this.selectedType != this.info.itemId) {
      this.selectedType = this.info.itemId;
      this.getInspectionItems(this.selectedType);
    }
    // console.log(this.info);
    this.dataChange.emit();
  }

  getInspectionItems(type) {
    this._inspectionItemService.getInspectionItems(0, 99999, type)
      .subscribe(
         res => {
           if (res.code === 0 && res.data && res.data.content) {
            this.inspectionList = res.data.content;
            this.inspectionList.forEach(obj => {
              obj.itemId = this.selectedType;
              });
            this.info.list = [];
            this.inspectionList.forEach(list => {
              this.info.list.push({
                name: list.name, 
                type: list.type, 
                max: list.max, 
                min: list.min, 
                reference: list.reference,
                unit: list.unit,
                value: ''
              })
            })
            // this.info.list = this.inspectionList;
            // console.log(this.info);
           } 
         })
  }

  getInspectionCategories() {
    return this._inspectionItemService.getInspectionCategories()
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.inspectionType = res.data;
        } else {
          this.inspectionType = [];
        }
      }, err => {
        this.inspectionType = [];
      })
  }

}