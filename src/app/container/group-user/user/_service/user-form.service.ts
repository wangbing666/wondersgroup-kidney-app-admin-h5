import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown } from '../../../../entities';

@Injectable()
export class UserFormService {

  setForm(hospitalList: Array < any > ,kidneyList: Array < any > ,data ? : any) {

    let disable: boolean = false;
    let forms: FormBase<any>[] = [];
    if (data) {
      disable = true;
      forms.push(
        new FormText({
          key: 'id',
          label: '用户ID',
          disabled:"disabled",
          value: data && data.id || '',
          disable: disable,
          required: true,
          order: 0
        }),
        new FormText({
          key: 'tel',
          label: '手机号',
          value: data && data.tel || '',
          disable: disable,
          disabled:"disabled",
          required: true,
          order: 1
        }),
        new FormText({
          key: 'name',
          label: '患者姓名',
          value: data && data.name || '',
          disabled:"disabled",
          required: true,
          order: 2
        }),
        new FormText({
          key: 'idCard',
          label: '身份证号',
          value: data && data.idCard || '',
          disabled:"disabled",
          required: true,
          order: 8
        }),
      );
    }else{
       disable = true;
       forms.push(
         new FormText({
          key: 'tel',
          label: '手机号',
          value: data && data.tel || '',
          disable: disable,
          required: true,
          order: 1
         }),
         new FormText({
          key: 'name',
          label: '患者姓名',
          value: data && data.name || '',
          required: true,
          order: 2
        }),
        new FormText({
          key: 'idCard',
          label: '身份证号',
          value: data && data.idCard || '',
          required: true,
          order: 8
        }),
      );
    };

    forms.push(
      new FormFile({
        key: 'head',
        label: '患者头像',
        value: data && data.head || '',
        accept: 'image/*',
        required: false,
        order: 3
      }),
      new FormDropdown({
        key: 'gender',
        label: '性别',
        value: data && (data.genderId === 0 ? data.genderId : data.genderId || ''),
        required: true,
        options: [
        { id: 0, name: '男' },
        { id: 1, name: '女' }
        ],
        order: 4
      }),
      new FormText({
        key: 'age',
        label: '年龄',
        value: data && data.age || '',
        required: true,
        order: 5
      }),
      new FormText({
        key: 'height',
        label: '身高',
        value: data && data.height || '',
        required: false,
        order: 6
      }),
      new FormText({
        key: 'birthday',
        label: '出生日期',
        value: data && (data.birthday || ''),
        type: 'date',
        required: false,
        order: 7
      }),
      new FormDropdown({
        key: 'hospitalId',
        label: '肾移植医院',
        value: data && (data.hospitalId === 0 ? data.hospitalId : data.hospitalId || ''),
        required: true,
        options: hospitalList,
        order: 10
      }),

      new FormDropdown({
        key: 'kidneySourceId',
        label: '肾来源',
        value: data && (data.kidneySourceId === 0 ? data.kidneySourceId  : data.kidneySourceId  || ''),
        options:kidneyList,
        required: true,
        order: 11
      }),

      new FormText({
        key: 'kidneyDate',
        label: '肾移植时间',
        value: data && (data.kidneyDate || ''),
        type: 'date',
        required: false,
        order: 12
      }),
      new FormTextarea({
        key: 'address',
        label: '地址',
        value: data && data.address || '',
        required: false,
        order: 13
      }),
      new FormTextarea({
        key: 'remark',
        label: '备注',
        value: data && data.remark || '',
        required: false,
        order: 14
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}