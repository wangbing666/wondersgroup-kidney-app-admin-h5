import { Component, OnInit } from '@angular/core';

import { DepartmentService, DepartmentTableService, DepartmentFormService } from './_service';
import { TableOption } from '../../../entities';

@Component({
  selector: 'app-department',
  templateUrl: 'department.component.html'
})
export class DepartmentComponent implements OnInit {
  title ='基础数据维护';
  subTitle = '科室数据维护';
  
  // 科室数据维护列表
  departmentTable: TableOption = new TableOption();
  departmentLists: Array<any>;

  // 新建／编辑科室数据维护模态框选项
  modalTitle: string = '';
  status: string = '';
  enableEdit: boolean;
  department: any;

  // 展示信息模态框选项
  enableShow: boolean;
  titleShow: string;
  message: string;

  errorMessage: string;

  constructor(
    private _departmentService: DepartmentService,
    private _departmentFormService: DepartmentFormService,
    private _departmentTableService: DepartmentTableService
  ) { }

  ngOnInit() { 
    this.getDepartmentTitles();
    this.getDepartments(0);
  }

  getDepartmentTitles(){
    this.departmentTable.titles = this._departmentTableService.setDepartmentTitles();
  }

  refresh(){
    this.getDepartments(0);
  }

  getDepartments(page: number){
    this.departmentTable.currentPage = page;
    this._departmentService.getDepartment(page, 20)
    .subscribe(
      data => {
        if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.departmentTable.errorMessage = "该数据为空哦～";
          } else if(data.data && data.data.content && data.code === 0){
          this.departmentTable.totalPage = data.data.totalPages;
          this.departmentTable.lists = data.data.content;
        } else{
            this.departmentTable.errorMessage = "空空如也~";
        }
      }, err => {
          this.departmentTable.errorMessage = "啊哦！接口访问出错啦~";
      })
  }

  gotoHandle(data){
    if(data.key == 'editDepartment'){
      this.department = data.value;
      this.enableEdit = true;
    }
  }

  newDepartment(){
    this.department = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.getDepartments(0);
  }
}