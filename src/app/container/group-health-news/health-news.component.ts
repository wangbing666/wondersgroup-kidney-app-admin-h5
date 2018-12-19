import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TableOption } from '../../entities';

import { HealthNewsService, HealthNewsTableService,HealthNewsDoctorTableService } from './_service';

declare var $: any;

@Component({
  selector: 'app-health-news',
  templateUrl: './health-news.component.html'
})
export class HealthNewsComponent implements OnInit{
  title = '健康资讯管理';
  subTitle = '健康资讯列表';

  healthNewsTable: TableOption = new TableOption();
  healthNewsDoctorTable: TableOption = new TableOption();
  healthNewsType: any;
  selectedType = { id: null, name: '' };

  healthNewsData: any;
  enableEdit: boolean;

  praiseCountSettings:any
  readingQuantitySettings:any;

  readingquantity:any={
    reading:"",
    quantity:""
  };
  enablereading: boolean;

  message: string;
  enableShow: boolean;

  delData: any;
  enableDel: boolean;

  constructor(
    private _healthNewsService: HealthNewsService,
    private _healthNewsTableService: HealthNewsTableService,
    private _HealthNewsDoctorTableService: HealthNewsDoctorTableService
  ) {}

  ngOnInit() {
    $('#healthNewsType').dropdown();
    this.refresh();
  }

  getType(opt) {
    this.selectedType = opt;
    this.getHealthNews(0);
  }

  refresh() {
    this.getSetting();
    this.getHealthNews(0);
    this.getDoctorHealthNews(0);
    this.getHealthNewsTitles();
    this.getHealthNewsType()
      .subscribe(
        () => {
          this.getHealthNews(0);
        });
  }

  getHealthNewsType() {
    return this._healthNewsService.getHealthNewsType()
      .map(
        data => {
          if (data.data && data.code == 0) {
            this.healthNewsType = data.data;
            this.selectedType = data.data[0];
          }
        },err => {
          this.healthNewsTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getSetting(){
     this._healthNewsService.getSetting().subscribe(
       data => {
        this.praiseCountSettings = data.data.praiseCountSettings;
        this.readingQuantitySettings = data.data.readingQuantitySettings;
       },err =>{
        this.healthNewsTable.errorMessage = "啊哦！接口访问出错啦～";
       })
  }

  getHealthNewsTitles() {
    this.healthNewsTable.titles = this._healthNewsTableService.setTitles();
    this.healthNewsDoctorTable.titles = this._HealthNewsDoctorTableService.setTitles();
  }

  getHealthNews(page: number) {
    this.healthNewsTable.currentPage = page;
    this._healthNewsService.getHealthNews(this.selectedType.id, page, this.healthNewsTable.size)
      .subscribe(
        data => {
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.healthNewsTable.lists = null;
            this.healthNewsTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.healthNewsTable.totalPage = data.data.totalPages;
            this.healthNewsTable.lists = data.data.content;
          } else {
            this.healthNewsTable.lists = null;
            this.healthNewsTable.errorMessage = "啊哦！没有接收到数据哎～";
          }
        },err => {
          this.healthNewsTable.lists = null;
          this.healthNewsTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getDoctorHealthNews(page: number) {
    this.healthNewsDoctorTable.currentPage = page;
    this._healthNewsService.getDoctorHealthNews(page, this.healthNewsDoctorTable.size)
      .subscribe(
        data => {
          if (data.data  && data.data.length === 0 && data.code === 0) {
            this.healthNewsDoctorTable.lists = null;
            this.healthNewsDoctorTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.healthNewsDoctorTable.totalPage = data.data.totalPages;
            this.healthNewsDoctorTable.lists = data.data;
            for (var i = 0; i < this.healthNewsDoctorTable.lists.length; ++i) {
              this.healthNewsDoctorTable.lists[i].recommendName =this.setStatus(this.healthNewsDoctorTable.lists[i].recommend); 
            }
          } else {
            this.healthNewsDoctorTable.lists = null;
            this.healthNewsDoctorTable.errorMessage = "啊哦！没有接收到数据哎～";
          }
        },err =>{
          this.healthNewsDoctorTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getHealthNewsSelected(div) {
    this.selectedType = div.target.value;
    this.getHealthNews(0);
  }

  setStatus(status){
    if(status == 0){
      return "是";
    }else{
      return "否";
    }
  }

  gotoHandle(data) {
    if (data.key === 'edit') {
      this.healthNewsData = data.value;
      this.enableEdit = true;
    } else if (data.key === 'del') {
      this.delData = data;
      this.enableDel = true;
    }else if(data.key === "delete"){
      this.delData = data;
      this.enableDel = true;
    }
  }

  newHealthNews() {
    this.healthNewsData = null;
    this.enableEdit = true;
  }

  newreadingQuantity(reading){
    this.enablereading = true;
    this.readingquantity.reading = this.readingQuantitySettings;
    this.readingquantity.quantity = reading;
  }

  newConfigurationThumb(thumb){
    this.enablereading = true;
    this.readingquantity.reading = this.praiseCountSettings;
    this.readingquantity.quantity = thumb;
  }
  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.refresh();
  }

  delete() {
    if(this.delData.key === 'del'){
      this._healthNewsService.healthNewsDelete(this.delData.value.id)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.delCancel();
            this.message = "删除成功";
            this.enableShow = true;
            this.getHealthNews(0);
          } else {
            this.delCancel();
            if (data.msg) {
              this.message = data.msg;
            } else {
              this.message = "删除失败";
            }
            this.enableShow = true;
          }
        },err =>{
          this.delCancel();
          this.message = "删除失败";
          this.enableShow = true;
        })
    }else if(this.delData.key === 'delete') {
      this._healthNewsService.healthNewsDoctorDelete(this.delData.value.id)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.delCancel();
            this.message = "删除成功";
            this.enableShow = true;
            this.getDoctorHealthNews(0);
          } else {
            this.delCancel();
            if (data.msg) {
              this.message = data.msg;
            } else {
              this.message = "删除失败";
            }
            this.enableShow = true;
          }
        },err => {
          this.delCancel();
          this.message = "删除失败";
          this.enableShow = true;
        })
    }
  }

  delCancel() {
    this.delData = null;
    this.enableDel = false;
  }

}
