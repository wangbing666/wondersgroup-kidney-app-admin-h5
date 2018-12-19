import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableOption } from '../../../../entities';

import { IntegralDetailTableService, DoctorService } from '../_service';

@Component({
  selector: 'integral-detail',
  templateUrl:"./integral-detail.component.html",
})
export class IntegralDetailComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();

  IntegralDetailTable: TableOption = new TableOption();

  modalTitle: string;

  constructor(
    private _integraldetailTableService: IntegralDetailTableService,
    private _doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.getIntegralDetailTable(0);
    this.getIntegralDetailTitles();
  }

  getIntegralDetailTitles() {
    this.modalTitle = this.data.value.name+"积分明细";
    this.IntegralDetailTable.titles = this._integraldetailTableService.setTitles();
  }

  getIntegralDetailTable(page:number){
     this.IntegralDetailTable.errorMessage = '';
     this.IntegralDetailTable.loading = true;
     this.IntegralDetailTable.lists = null;
     this.IntegralDetailTable.currentPage = page;
     this._doctorService.getdoctorIntegral(this.data.value.id,20,page).subscribe(
        data =>{
          this.IntegralDetailTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.IntegralDetailTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.IntegralDetailTable.totalPage = data.data.totalPages;
            this.IntegralDetailTable.lists = data.data.content;
            for (var i = 0; i < this.IntegralDetailTable.lists.length; ++i) {
              this.IntegralDetailTable.lists[i].createDate =this.getDate(this.IntegralDetailTable.lists[i].createDate); 
              this.IntegralDetailTable.lists[i].tel = this.data.value.tel;
            }
          } else {
            this.IntegralDetailTable.errorMessage = "空空如也～";
          }
        }, err =>{
          this.IntegralDetailTable.loading = false;
          this.IntegralDetailTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  //时间转换
  getDate(time){
    let d = new Date(Number(time));
    var date = (d.getFullYear()) + "-" + 
               (d.getMonth() + 1) + "-" +
               (d.getDate()) + " " + 
               (d.getHours()) + ":" + 
               (d.getMinutes()) + ":" + 
               (d.getSeconds());
    return date;
  }

  refresh(){
    this.getIntegralDetailTable(0);
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
