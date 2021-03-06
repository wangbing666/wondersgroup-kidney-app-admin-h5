import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataCollectionService } from '../_service';

@Component({
  selector: 'unhandle',
  template: `
  <modal-edit [title]="'操作提示'" [message]="'您确定暂不处理该用户资料？'">
    <form #f="ngForm" (ngSubmit)="process(f.value)" class="ui form" style="padding-bottom: 15px">
      <div class="ui fuild field">
        <input id="name" placeholder="请输入操作人姓名" name="auditName" ngModel required>
      </div>
      <div class="ui fuild field">
        <input id="name" placeholder="备注" name="remark" ngModel required>
      </div>
      <button class="ui button blue" type="submit">确定</button>
      <button type="button" class="ui button" (click)="processCancel()">取消</button>
    </form>
  </modal-edit>
  `
})
export class HandleUnhandleComponent implements OnInit {
  @Input() id: any;
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() done: EventEmitter<any> = new EventEmitter();
  @Input() hidden;

  constructor(
    private _dataCollection: DataCollectionService
  ) {
  }

  ngOnInit() {
    // console.log(this.id);
  }

  process(value) {
    value.status = 2;
    // console.log(value);
    this._dataCollection.statusChanged(this.id, value)
    .subscribe(res => {
      if(res.code == 0){
        this.done.emit({code: 0, msg: '提交成功'});
      } else {
        this.done.emit({code: -1, msg: res.msg || '提交失败'});
      }
    }, err => {
      this.done.emit({code: -1, msg: '请求服务器出错'});
    })
  }

  processCancel() {
    this.cancel.emit();
  }

}