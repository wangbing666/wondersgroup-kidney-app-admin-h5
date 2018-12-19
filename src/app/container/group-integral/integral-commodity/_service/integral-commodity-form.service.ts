import { Injectable, Inject } from '@angular/core';

import {
  FormBase,
  FormText,
  FormFile,
  FormTextarea,
  FormDropdown,
  FormEditor
} from '../../../../entities';

@Injectable()
export class IntegralCommodityFormService {

constructor(@Inject('admin') private admin) {}

  setForm(data ? : any) {

    let forms: FormBase < any > [] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'goodId',
          label: 'ID',
          value: data && data.id || '',
          type: 'hidden',
          required: false,
          order: 0
        })
      );
    }

    forms.push(
      new FormFile({
        key: 'image',
        label: '商品小图',
        value: data && data.image || '',
        required: true,
        order: 1
      }),
      new FormFile({
        key: 'detailImage',
        label: '商品详情图片',
        value: data && data.detailImage || '',
        required: true,
        order: 2
      }),
      new FormText({
        key: 'name',
        label: '商品标题',
        value: data && data.name || '',
        required: true,
        order: 3
      }),
      new FormText({
        key: 'recommandedValue',
        label: '推荐值',
        value: data && (data.recommandedValue === 0 ? data.recommandedValue : data.recommandedValue || ''),
        type: 'number',
        required: false,
        order: 4
      }),
      new FormText({
        key: 'point',
        label: '兑换积分',
        value: data && (data.point === 0 ? data.point : data.point || ''),
        type: 'number',
        required: true,
        order: 5
      }),
      new FormDropdown({
        key: 'enabled',
        label: '状态',
        value: data && (data.enabled === true ? data.enabled : data.enabled || ''),
        required: true,
        options: [{
          id: true,
          name: '上架'
        }, {
          id: false,
          name: '下架'
        }],
        order: 6
      }),
      new FormDropdown({
        key: 'appType',
        label: '添加到APP',
        value: data && (data.appType === 0 ? data.appType : data.appType || ''),
        required: true,
        options: [{
          id: 0,
          name: '患者端'
        }, {
          id: 1,
          name: '医生端'
        }],
        order: 7
      }),
       new FormText({
        key: 'postage',
        label: '邮费',
        value: data && (data.postage === 0 ? data.postage : data.postage || ''),
        type: 'number',
        required: false,
        order: 8
      }),
      new FormEditor({
        key: 'description',
        label: '商品描述',
        value: data && data.description || '',
        required: true,
        order: 9
      }),
      new FormText({
        key: 'adminId',
        label: '操作人',
        value: this.admin.getId(),
        type: 'hidden',
        required: false,
        order: 10
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }

}
