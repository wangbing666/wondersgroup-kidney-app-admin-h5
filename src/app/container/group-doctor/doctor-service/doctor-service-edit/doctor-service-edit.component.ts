import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableOption } from '../../../../entities';

import { DoctorServiceFormService, DoctorServiceService, DoctorServiceTableService} from '../_service';

@Component({
  selector: 'doctor-service-edit',
  templateUrl: 'doctor-service-edit.component.html'
})
export class DoctorServiceEditComponent implements OnInit {

  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  serviceDetailTable: TableOption = new TableOption();

  modalTitle = "服务明细";
  tableDatas: any;
  errorMessage: string;

  constructor(
  	private _doctorGroupService: DoctorServiceService,
    private _doctorGroupFormService: DoctorServiceFormService,
    private _doctorGroupTableService: DoctorServiceTableService,
    ) { }
  ngOnInit() {
  	this.getDoctorServiceEditTitles();
  	this.getDoctorServiceEdit(0);
  }


   getDoctorServiceEditTitles(){
	    this.serviceDetailTable.titles = this._doctorGroupTableService.setDoctoreditTitles();
	 }


  getDoctorServiceEdit(page: number){
    this.serviceDetailTable.currentPage = page;
    this._doctorGroupService.getServiceDetails(this.data.id,page, 10)
      .subscribe(
        data => {
          this.serviceDetailTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.serviceDetailTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.serviceDetailTable.totalPage = data.data.totalPages;
            this.serviceDetailTable.lists = data.data.content;
          } else {
            this.serviceDetailTable.errorMessage = "空空如也～";
          }
        },err =>{
        this.serviceDetailTable.loading = false;
        this.serviceDetailTable.errorMessage = "啊哦！接口访问出错啦～";
      })
  }

refresh(){
  this.getDoctorServiceEdit(0);
}

close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }
}