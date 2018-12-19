import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Collection, Inspection, Image, Medicine } from '../data-collection.entity';

@Component({
  selector: 'app-inspection-item-form',
  templateUrl: 'inspection-item-form.component.html'
})
export class InspectionItemFormComponent implements OnInit {
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  info: Inspection = new Inspection();

  constructor() {}

  ngOnInit() {
    this.info = this.data;
  }

  saveAsDraft(){
    // console.log(this.info);
    if(this.info && this.info.type == '1' && this.info.value) {
      if(parseFloat(this.info.value) > parseFloat(this.info.max)){
        this.info.standard = '2';
      } else {
        this.info.standard = parseFloat(this.info.value) < parseFloat(this.info.min) ? "0" : "1";
      }
    }
    this.dataChange.emit();
  }
}