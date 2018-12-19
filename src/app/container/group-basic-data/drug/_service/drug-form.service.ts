import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown } from '../../../../entities';


@Injectable()
export class DrugFormService {

setForm(
    // enables: Array < any > ,
    data? : any
  ) {
     let forms: FormBase < any > [] = [

     new FormText({
        key: 'id',
        label: 'id',
        value: data && data.id|| '',
        required: false,
        type: "hidden",
        order: 0
      }),
     new FormText({
        key: 'medicineName',
        label: '药品通用名称',
        value: data && data.medicineName|| '',
        required: true,
        order: 2
      }),
      new FormText({
        key: 'company',
        label: '品牌',
        value: data && data.company || '',
        required: true,
        order: 3
      }),
     new FormText({
        key: 'mainIngredients',
        label: '成分',
        value: data && data.mainIngredients || '',
        required: true,
        order: 4
      }),
      new FormText({
        key: 'properties',
        label: '性状',
        value: data && data.properties || '',
        required: true,
        order: 6
      }),
      new FormText({
        key: 'indications',
        label: '适应症',
        value: data && data.indications || '',
        required: true,
        order: 5
      }),
      new FormText({
        key: 'number',
        label: '分类',
        value: data && data.number || '',
        required: true,
        order: 1
      }),
      new FormText({
        key: 'unit',
        label: '单位',
        value: data && data.unit || '',
        required: true,
        order: 7
      }),
      new FormText({
        key: 'suggestion',
        label: '用法建议',
        value: data && data.suggestion || '',
        required: true,
        order: 8
      }),
      new FormText({
        key: 'adverseReactions',
        label: '不良反应',
        value: data && data.adverseReactions || '',
        required: true,
        order: 9
      }),
      new FormText({
        key: 'taboo',
        label: '禁忌',
        value: data && data.taboo || '',
        required: true,
        order: 10
      }),
      new FormText({
        key: 'attention',
        label: '注意事项',
        value: data && data.attention || '',
        required: true,
        order: 11
      }),
      new FormText({
        key: 'packaging',
        label: '包装',
        value: data && data.packaging || '',
        required: true,
        order: 12
      }),
     new FormDropdown({
        key: 'display',
        label: '状态',
        value: data && (data.display == 0 ? data.display : data.display || ''),
        required: true,
        options: [{
          id: 0,
          name: '启用'
        }, {
          id: 1,
          name: '不启用'
        }],
        order: 13
      })
     ];

    return forms.sort((a, b) => a.order - b.order);
  }
}