import { Component, OnInit, Input } from '@angular/core';

import { DataCollectionDetailService } from '../../_service';

@Component({
  selector: 'app-report-detail',
  templateUrl: 'report-detail.component.html',
  styleUrls: ['../../data-collection.component.css']
})
export class ReportDetailComponent implements OnInit {
  @Input() info: any;

  inspectionList: any;

  constructor(private _dataCollectionDetailService: DataCollectionDetailService) {

  }

  ngOnInit() {
    this.getTitle();
  }

  getTitle() {
    this.inspectionList = this._dataCollectionDetailService.setInspectionList();
  }
}