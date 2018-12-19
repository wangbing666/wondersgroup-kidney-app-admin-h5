import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { Image } from '../data-collection.entity';

declare let $: any;
declare var flatpickr: any;

@Component({
  selector: 'app-image-form',
  templateUrl: 'image-form.component.html'
})
export class ImageFormComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  @Input() index: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  info: Image;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.info = this.data;
    if(this.info.id) {
      this.index = `${this.index}a${this.info.id}`;
    }
  }

  ngAfterViewInit(){
    $("#time" + this.index).flatpickr({
      "locale": "zh",
      "defaultDate": this.info.time || ''
    });
    this.cdr.detectChanges();
  }

  saveAsDraft(){
    this.dataChange.emit();
  }
}