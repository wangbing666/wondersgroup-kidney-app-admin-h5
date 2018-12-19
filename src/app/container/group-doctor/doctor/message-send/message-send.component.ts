import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableOption } from '../../../../entities';

import { DoctorService } from '../_service';

@Component({
  selector: 'app-message-send',
  templateUrl: 'message-send.component.html',
  styleUrls: ['message-seng.component.css']
})
export class MessageSendComponent implements OnInit {
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();

  auditedTable: TableOption = new TableOption();
  selectedItems: Array < any > = [];

  errorMessage: string;
  message: string;
  errorColor: string;

  constructor(private _doctorService: DoctorService) {}

  ngOnInit() {
    this.getAuditedDoctors(0);
  }

  getAuditedDoctors(page: number) {
    this.auditedTable.currentPage = page;
    this._doctorService.getAuditedDoctors(page, 10)
      .subscribe(
        data => {
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.auditedTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.auditedTable.totalPage = data.data.totalPages;
            this.auditedTable.lists = data.data.content;
          } else {
            this.auditedTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.auditedTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  selectedItem(item) {
    let target = true;
    this.selectedItems.forEach(obj => {
      if (item.id === obj.id) {
        target = false;
      }
    })
    if (target) {
      this.selectedItems.push(item);
    }
  }

  removeItem(item) {
    let index;
    this.selectedItems.forEach((obj, i) => {
      if (item.id === obj.id) {
        index = i;
      }
    })
    this.selectedItems.splice(index, 1);
  }

  onSubmit(value) {
    if (this.selectedItems.length !== 0) {
      let ids = [];
      this.selectedItems.forEach(obj => {
        ids.push(obj.id);
      })
      this._doctorService.sendMessage({
          content: value.message,
          doctorIds: ids
        })
        .subscribe(
          data => {
            if (data.code === 0) {
              this.errorMessage = "短信发送成功";
              this.errorColor = 'blue';
              this.reset();
            } else {
              if (data.msg) {
                this.errorMessage = data.msg;
              } else {
                this.errorMessage = "短信发送失败";
              }
              this.errorColor = 'red';
            }
          }, err => {
            this.errorMessage = "服务器连接失败";
            this.errorColor = 'red';
          })
    }
  }

  reset() {
    this.message = '';
    this.selectedItems = [];
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
