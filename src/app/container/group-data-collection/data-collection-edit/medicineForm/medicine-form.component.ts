import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { Collection, Inspection, Image, Medicine } from '../data-collection.entity';

import { DataCollectionService } from '../../_service';

declare let $: any;

@Component({
  selector: 'app-medicine-form',
  templateUrl: 'medicine-form.component.html'
})
export class MedicineFormComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  @Input() index: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  searchStream: Subject<string> = new Subject<string>();
  results$: Array<string>;
  info: Medicine;
  
  constructor(
    private cdr: ChangeDetectorRef,
    private _drugService: DataCollectionService
  ) {}

  ngOnInit() {
    this.info = this.data;
    if(this.info.id) {
      this.index = `${this.index}a${this.info.id}`;
    }
    this.searchStream
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe(searchText => {
          this.loadData(this.info.name);
    });
  }

  ngAfterViewInit() {
    // console.log(this.index);
    let date: any = '';
    if(this.info.startTime) {
      date = this.toDate(this.info.startTime);
      this.info.startTime = date;
    }
    // console.log(date);
    $("#startTime" + this.index).flatpickr({
      "locale": "zh",
      "enableTime": true
    });
    this.cdr.detectChanges();
    // $('#recordHistoryType').dropdown({
    //   placeholder: typeList[this.data.content.recordHistoryType-1] || '',
    // });
  }

  saveAsDraft() {
    this.dataChange.emit();
  }

  search($event) {
    this.searchStream.next(this.info.name);
  }

  loadData(key) {
    if(key) {
      this._drugService.getDrugs(key)
        .subscribe(res => {
          if(res.code === 0 && res.data && res.data.length !== 0) {
            this.results$ = res.data;
          }
        });
    }
  }

  selected(data) {
    this.info.name = data.medicineName;
    this.info.method = data.suggestion;
    this.results$ = [];
  }

  toDate(time) {
    let date = new Date(time);
    let Y = date.getFullYear().toString();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString();
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()).toString();
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()).toString();
    return `${Y}-${M}-${D} ${h}:${m}`;
  }

}