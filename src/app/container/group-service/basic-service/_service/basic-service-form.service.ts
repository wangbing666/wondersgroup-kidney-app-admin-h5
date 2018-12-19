import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown } from '../../../../entities';


@Injectable()
export class BasicServiceFormService {
  setForm(
    data ? : any
  ) {

    let forms: FormBase < any > [] = [
      new FormText({
        key: 'id',
        label: 'ID',
        value: data && data.id || '',
        type: "hidden",
        order: 0
      }),
      new FormFile({
        key: 'image',
        label: '服务图片',
        value: data && data.image || '',
        accept: 'image/*',
        required: false,
        order: 1
      }),
      new FormText({
        key: 'name',
        label: '服务名称',
        value: data && data.name || '',
        required: true,
        order: 2
      }),
      new FormText({
        key: 'frequency',
        label: '咨询次数',
        value: data && (data.frequency == 0 ? data.frequency : data.frequency || ''),
        required: true,
        order: 3
      }),
      new FormText({
        key: 'maxValue',
        label: '最大金额',
        value: data && (data.maxValue == 0 ? data.maxValue : data.maxValue || ''),
        required: true,
        order: 4
      }),
      new FormText({
        key: 'minValue',
        label: '最小金额',
        value: data && (data.minValue == 0 ? data.minValue : data.minValue || ''),
        required: true,
        order: 5
      }),
      new FormDropdown({
        key: 'nameOpen',
        label: '状态',
        value: data && (data.nameOpen == false ? data.nameOpen : data.nameOpen || ''),
        required: true,
        options: [{
          id: false,
          name: '不启用'
        }, {
          id: true,
          name: '启用'
        }],
        order: 6
      }),
      new FormTextarea({
        key: 'lntroduction',
        label: '服务说明',
        value: data && data.lntroduction || '',
        required: true,
        order: 7
      }),
    ];

    return forms.sort((a, b) => a.order - b.order);
  }
}
