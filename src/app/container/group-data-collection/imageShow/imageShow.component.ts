import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-image-show',
  templateUrl: 'imageShow.component.html',
  styleUrls: ['imageShow.component.css']
})
export class ImageShowComponent implements OnInit, AfterViewInit {
  @Input() imgList: any;

  index = 1;
  imgWidth = 100;

  constructor() {
  }

  ngOnInit() {
    // console.log(this.imgList);
  }

  ngAfterViewInit() {
    $('#imageShow').perfectScrollbar();
    $('#imageShow').perfectScrollbar('update');
  }

  previous() {
    if(this.index > 1) {
      this.index--;
      this.reset();
    }
  }

  next() {
    if(this.index < this.imgList.length) {
      this.index++;
      this.reset();
    }
  }

  enlarge() {
    this.imgWidth = 1.5 * this.imgWidth; 
    $('#imageShow').scrollLeft(0);
    $('#imageShow').scrollTop(0);
  }

  reduce() {
    this.imgWidth = this.imgWidth / 1.5;
    $('#imageShow').scrollLeft(0);
    $('#imageShow').scrollTop(0);
  }

  reset() {
    this.imgWidth = 100; 
    $('#imageShow').scrollLeft(0);
    $('#imageShow').scrollTop(0);
  }

}