import { Component, OnInit, Input } from '@angular/core';

import { DataCollectionDetailService } from '../../_service';

@Component({
  selector: 'app-medical-detail',
  templateUrl: 'medical-detail.component.html',
  styleUrls: ['../../data-collection.component.css']
})
export class MedicalDetailComponent implements OnInit {
  @Input() info: any;

  medicalList: any;

  constructor(private _dataCollectionDetailService: DataCollectionDetailService) {

  }

  ngOnInit() {
    this.getTitle();
  }

  getTitle() {
    this.medicalList = this._dataCollectionDetailService.setMedicalList();
  }
}