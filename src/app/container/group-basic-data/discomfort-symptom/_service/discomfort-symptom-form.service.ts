import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown } from '../../../../entities';


@Injectable()
export class DiscomfortFormService {

    setForm(
    typeList: Array < any >,
    data ? : any
  ) {
     let forms: FormBase < any > [] = [];

     if(data){
       forms.push(
        new FormText({
          key: 'id',
          label: '不适症状ID',
          value: data && data.id|| '',
          type: "hidden",
          order: 0
      }),
        new FormDropdown({
          key: 'categoryId',
          label: '请选择类型',
          value: data && data.categoryId || '',
          required: true,
          options: typeList,
          order: 1
      }))
     } else {
        forms.push(
          new FormDropdown({
            key: 'categoryId',
            label: '请选择类型',
            value: data && data.categoryId || '',
            required: true,
            options: typeList,
            order: 1
      }))
     }
     forms.push(
          new FormFile({
            key: 'image',
            label: '说明图片（可选）',
            value: data && data.image || '',
            accept: 'image/*',
            required: false,
            order: 2
      }),
          new FormText({
            key: 'name',
            label: '名称',
            value: data && data.name || '',
            required: true,
            order: 3
      }),
          new FormDropdown({
            key: 'enabled',
            label: '状态',
            value: data && (data.enabled == false ? data.enabled : data.enabled || ''),
            required: true,
            options: [{
            id: true,
            name: '启用'
            }, {
            id: false,
            name: '禁用'
        }],
            order: 4
      })
      );  
     
    return forms.sort((a, b) => a.order - b.order);
  }
}