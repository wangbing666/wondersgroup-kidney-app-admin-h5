import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown, FormEditor } from '../../../../entities';

@Injectable()
export class HealthServiceFormService {
  setForm(organizationList, data ? : any) {
    let disable: boolean = false;
    let forms: FormBase<any>[] = [];
    if (data) {
      disable = true;
      forms.push(
        new FormText({
          key: 'adminId',
          label: 'ID',
          value: data && data.adminId || '',
          type: 'hidden',
          required: true,
          order: 0
        })
      );
    }
    disable = true;
    forms.push(
      new FormFile({
        key: 'mainFigure',
        label: '服务小图',
        value: data && data.mainFigure || '',
        accept: 'image/*',
        required: false,
        order: 1
      }),
      new FormFile({
        key: 'detailFigures',
        label: '详情图片',
        value: data && data.detailFigures || [],
        accept: 'image/*',
        multiple: true,
        required: false,
        order: 2
      }),
      new FormText({
        key: 'serviceName',
        label: '服务名称',
        value: data && (data.name || ''),
        disable:disable,
        required: true,
        order: 3
      }),
      new FormDropdown({
        key: 'thirdParty',
        label: '服务机构',
        value: data && (data.providerId === 0 ? data.providerId : data.providerId || ''),
        required: true,
        options: organizationList,
        order: 4
      }),
      new FormText({
        key: 'price',
        label: '服务价格',
        value: data && data.price || '',
        required: true,
        order: 5
      }),
      new FormText({
        key: 'unit',
        label: '单位',
        value: data && data.unit || '',
        order: 5
      }),
      new FormDropdown({
        key: 'enabled',
        label: '状态',
        value: data && (data.enabled === false ? data.enabled : data.enabled || ''),
        required: false,
        options: [
        { id: true, name: '启用' },
        { id: false, name: '禁用' }
        ],
        order: 6
      }),
      new FormTextarea({
        key: 'description',
        label: '服务简介',
        value: data && (data.description || ''),
        required: false,
        order: 7
      }),
      new FormEditor({
        key: 'goodsDetails',
        label: '商品描述',
        value: data && data.goodsDetails || '',
        required: false,
        order: 8
      }),
      new FormText({
        key: 'adminId',
        label: '添加用户',
        value: JSON.parse(window.sessionStorage.getItem('kidney_login_info')).id || '',
        type: 'hidden',
        required: false,
        order: 9
      })
    );
    return forms.sort((a, b) => a.order - b.order);
  }
}
