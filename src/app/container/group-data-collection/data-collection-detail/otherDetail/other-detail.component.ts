import { Component, OnInit, Input } from '@angular/core';

import { DataCollectionDetailService } from '../../_service';

@Component({
  selector: 'app-other-detail',
  templateUrl: 'other-detail.component.html',
  styleUrls: ['../../data-collection.component.css']
})
export class OtherDetailComponent implements OnInit {
  @Input() info: any;

  otherList: any;

  constructor(private _dataCollectionDetailService: DataCollectionDetailService) {

  }

  ngOnInit() {
    this.getTitle();
  }

  getTitle() {
    this.otherList = this._dataCollectionDetailService.setOtherList();
  }
}