import { Component, OnInit, Input } from '@angular/core';

import { DataCollectionDetailService } from '../../_service';

@Component({
  selector: 'app-record-detail',
  templateUrl: 'record-detail.component.html',
  styleUrls: ['../../data-collection.component.css']
})
export class RecordDetailComponent implements OnInit {
  @Input() info: any;

  recordList: any;

  constructor(private _dataCollectionDetailService: DataCollectionDetailService) {

  }

  ngOnInit() {
    this.getTitle();
  }

  getTitle() {
    this.recordList = this._dataCollectionDetailService.setRecordList();
  }
}