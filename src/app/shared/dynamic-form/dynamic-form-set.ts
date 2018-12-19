import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { FormBase } from '../../entities';
import { CommonService } from '../../services';

declare var $: any;
declare var wangEditor: any;

@Component({
  selector: 'dynamic-form-set',
  templateUrl: 'dynamic-form-set.html',
  styleUrls: ['dynamic-form.css']
})
export class DynamicFormSet implements OnInit, AfterViewInit {
  @Input() formdata: any;
  @Input() form: FormGroup;

  // 展示信息模态框选项
  enableShow: boolean = false;
  title: string = "提示信息";
  message: string;

  constructor(
    private _commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.formdata.controlType == 'editor') {
      this.newEditor(this.formdata.value);
    } else if (this.formdata.controlType == 'dropdown') {
      $('#' + this.formdata.key).dropdown();
    }
  }

  get isValid() {
    return this.form.controls[this.formdata.key].valid;
  }

  // 上传图片操作
  uploadChange(files) {
    let myForm = new FormData();
    myForm.append('files', files.target.files[0]);

    this._commonService.uploadFile(myForm, this);
  }

  UploadSuccess(data) {
    if (data.code === 0) {
      this.message = "上传图片成功！";
      this.enableShow = true;

      if (this.formdata.multiple === false) {
        this.formdata.value = data.data[0];
        this.cdr.detectChanges();
      } else {
        if (!this.formdata.value) {
          this.formdata.value = [];
        }
        this.formdata.value.push(data.data[0]);
        this.cdr.detectChanges();
      }

    } else {
      this.message = "上传图片失败！";
      this.enableShow = true;
    }
  }

  UploadFailure(data) {
    this.message = "上传图片失败！";
    this.enableShow = true;
  }

  fileDel(file ? : any) {
    if (!file) {
      this.formdata.value = null;
      $('#' + this.formdata.key).val('');
      this.cdr.detectChanges();
      this.title = "提示信息";
      this.message = "删除照片成功！";
      this.enableShow = true;
    } else {
      this.formdata.value.forEach((item, i) => {
        if (file == item) {
          this.formdata.value.splice(i, 1);
          this.cdr.detectChanges();
        }
      });
      if (this.formdata.value.length === 0) {
        this.formdata.value = null;
        $('#' + this.formdata.key).val('');
        this.cdr.detectChanges();
      }
      this.message = "删除照片成功！";
      this.enableShow = true;
    }
  }

  newEditor(editordata) {
    let editor = new wangEditor(this.formdata.key);
    editor.config.menus = [
      'source',
      '|',
      'bold',
      'underline',
      'italic',
      'strikethrough',
      'eraser',
      'forecolor',
      'bgcolor',
      '|',
      'quote',
      'fontfamily',
      'fontsize',
      'head',
      'unorderlist',
      'orderlist',
      'alignleft',
      'aligncenter',
      'alignright',
      '|',
      'link',
      'unlink',
      'table',
      '|',
      'img',
      '|',
      'undo',
      'redo',
      'fullscreen'
    ];
    editor.onchange = () => {
      this.formdata.value = editor.$txt.html();
      this.cdr.detectChanges();
    };
    editor.create();
    editor.$txt.html(editordata);
  }

  getChecked(div, value) {
    let ifChecked = div.target.checked;
    let ifExist: boolean = false;
    let i: number;

    if (this.formdata.value) {
      this.formdata.value.forEach((data, index) => {
        if (data === value) {
          ifExist = true;
          i = index;
        }
      });
    } else {
      this.formdata.value = [];
    }

    if (ifChecked && !ifExist) {
      this.formdata.value.push(value);
    }

    if (!ifChecked && ifExist) {
      this.formdata.value.splice(i, 1);
    }

    this.cdr.detectChanges();
  }

  addList(data) {
    this.cdr.detectChanges();
  }

  delList(data) {
    this.cdr.detectChanges();
  }

}
