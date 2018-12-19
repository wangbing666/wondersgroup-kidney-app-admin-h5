import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableTitle } from '../../entities';

@Component({
  selector: 'dynamic-table',
  templateUrl: 'dynamic-table.html',
  styleUrls: ['dynamic-table.css']
})
export class DynamicTable implements OnInit {
  @Input() titles: TableTitle[];
  @Input() lists: Array < any > ;
  @Output() handleEmmit = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  gotoHandle(key, value) {
    this.handleEmmit.emit({ key: key, value: value });
  }
}
