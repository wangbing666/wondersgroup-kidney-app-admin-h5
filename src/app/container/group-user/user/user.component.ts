import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { UserService, UserTableService ,UserFormService} from './_service';

declare var $: any;
declare var ExcellentExport:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  title = '患者信息维护';
  subTitle = '患者信息列表';
  loading: boolean = true;

  userTable: TableOption = new TableOption();
  userAllTable: TableOption = new TableOption();

  // 展示信息模态框选项
  message: string;
  enableShow: boolean;
  errorMessage:string;

  queryUserKey: string;

  totalElements:any;

  integral:any;
  enableDetail:any;

  status: string = '';
  enableEdit: boolean = false;
  user: any;


  constructor(
    private _userService: UserService,
    private _userFormService: UserFormService,
    private _userTableService: UserTableService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.userExcel();
    this.getUserTitles();
    this.getUsers(0);
  }

  resetUser() {
    this.queryUserKey = null;
    this.getUsers(0);
  }

  getUserTitles(){
    this.userTable.titles = this._userTableService.setTitles();
  }

  getUsers(page: number){
    this.userTable.currentPage = page;
    this._userService.getUsers(page,10)
      .subscribe(
        data => {
          this.userTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.userTable.totalPage = data.data.totalPages;
            this.userTable.lists = data.data.content;
            this.totalElements = data.data.totalElements;
            for (let i = 0; i < this.userTable.lists.length;i++) {
              this.userTable.lists[i].gender = this.getSex(this.userTable.lists[i].genderId);
              this.userTable.lists[i].validateStatus = this.getStatus(this.userTable.lists[i].validateStatus);
            }
            this.userVia(this.totalElements);
          } else {
            this.userTable.errorMessage = "空空如也～";
          }
        },err =>{
          this.userTable.loading = false;
          this.userTable.errorMessage = "啊哦！接口访问出错啦～";
      })
  }

  getuserSearch(page: number){
    this.userTable.currentPage = page;
    if (this.queryUserKey) {
      this._userService.getuserSearch(this.queryUserKey,10,page)
      .subscribe(
        data => {
          this.userTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userTable.errorMessage = "该数据为空哦～";
            this.userTable.lists =null;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userTable.totalPage = data.data.totalPages;
            this.userTable.lists = data.data.content;
            this.totalElements = data.data.totalElements;
            for (let i = 0; i < this.userTable.lists.length;i++) {
              this.userTable.lists[i].gender = this.getSex(this.userTable.lists[i].genderId);
              this.userTable.lists[i].validateStatus = this.getStatus(this.userTable.lists[i].validateStatus);
            }
          } else {
            this.userTable.errorMessage = "空空如也～";
          }
        },err =>{
          this.userTable.loading = false;
          this.userTable.errorMessage = "啊哦！接口访问出错啦～";
      })
    }
  }

  gotoHandle(data){
    if (data.key == 'edit') {
      this.user = data.value;
      this.enableEdit = true;
    } else if(data.key == "point"){
      this.integral = data;
      this.enableDetail = true;
    }
  }

  newUser(){
    this.user = new Array();
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    if(data == "修改成功！"){
      this.getUsers(this.userTable.currentPage);
    }else if(data == "添加成功！"){
      this.getUsers(0);
    }
  }

  getSex(sex){
    if(sex === 0) {
      return '男';
    }
    if(sex === 1) {
      return '女';
    }
    return null;
  }

  getStatus(status){
    if(status === 'Audited') {
      return '成功';
    }
    if(status === "Failure") {
      return '失败';
    }
    if(status === "Auditing"){
      return "处理中";
    }
    return null;
  }

  //打印excel;
  userVia(data){
    this._userService.getUsers(0,data)
      .subscribe(
        data => {
          this.userAllTable.lists = data.data.content;
          for (let i = 0; i < this.userAllTable.lists.length;i++) {
            this.userAllTable.lists[i].gender = this.getSex(this.userAllTable.lists[i].genderId);
            this.userAllTable.lists[i].validateStatus = this.getStatus(this.userAllTable.lists[i].validateStatus);
          }
      })
  }

  userExcel(){
    $('.userExcel').on('click', function(){
        let myDate = new Date();
        let $this = $(this);
        let table = $("#usertable")[0];
        $this.attr('download', '全程心管家患者信息列表-'+myDate.toLocaleDateString()+'.xls');
        ExcellentExport.excel(this, table);
    });
  }
}
