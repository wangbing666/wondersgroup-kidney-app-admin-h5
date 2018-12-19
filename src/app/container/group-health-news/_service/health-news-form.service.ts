import { Injectable, Inject } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown ,FormEditor} from '../../../entities';

@Injectable()
export class HealthNewsFormService {

  constructor(@Inject('admin') private admin) {}

  setForm(
    typeList: Array < any > ,
    data ? : any
  ) {
    let forms: FormBase < any > [] = [];
    let validated:boolean = true;
    if (data) {
      forms.push(
        new FormText({
          key: 'id',
          label: '',
          value: data && data.id || '',
          required: true,
          type: "hidden",
          order: 1
        }),
        new FormText({
          key: 'client',
          label: '',
          value: data && data.client || '',
          type: "hidden",
          order: 13
        }),
       );
      if(data.postoperativeClassification){
        forms.push(
          new FormDropdown({
            key: 'postoperativeClassificationId',
            label: '健康咨询分类',
            value: data && data.classificationId || '',
            required: true,
            options: typeList,
            order: 3
          }))
        }
    } else {
      forms.push(
        new FormDropdown({
          key: 'postoperativeClassificationId',
          label: '健康咨询分类',
          value: data && data.classificationId || '',
          required: true,
          options: typeList,
          order: 3
        }),
        new FormDropdown({
          key: 'client',
          label: '健康资讯选择',
          options: [{
            id: "患者",
            name: '患者端'
          }, {
            id: "医生",
            name: '医生端'
          }],
          required: true,
          order: 2
        }),
      )
    }

    forms.push(
      new FormFile({
        key: 'picture',
        label: '资讯大图',
        value: data && data.picture || '',
        required: false,
        order: 4
      }),
      new FormFile({
        key: 'thumbnails',
        label: '资讯小图',
        value: data && data.thumbnails || '',
        required: true,
        order: 5
      }),
      new FormText({
        key: 'title',
        label: '资讯标题',
        value: data && data.title || '',
        required: true,
        order: 6
      }),
      new FormTextarea({
        key: 'briefIntroduction',
        label: '资讯简介',
        value: data && data.briefIntroduction || '',
        required: true,
        order: 7
      }),
      new FormEditor({
        key: 'article',
        label: '资讯内容',
        value: data && data.article || '',
        required: false,
        order: 8
      }),
      new FormText({
        key: 'url',
        label: '资讯链接',
        value: data && data.url || '',
        required: false,
        order: 9
      }),
      new FormText({
        key: 'postoperativeUrl',
        label: '资讯链接ID',
        value: data && data.postoperativeUrl || '',
        required: false,
        type: "hidden",
      }),
      new FormDropdown({
        key: 'recommend',
        label: '是否推荐',
        value: data && (data.recommend == false ? data.recommend : data.recommend || ''),
        options: [{
          id: 0,
          name: '是'
        }, {
          id: 1,
          name: '否'
        }],
        required: true,
        order: 10
      }),
      new FormText({
        key: 'recommendedValue',
        label: '推荐值',
        value: data && (data.recommendedValue == false ? data.recommendedValue : data.recommendedValue || ''),
        required: false,
        order: 11
      }),
      new FormText({
        key: 'author',
        label: '上传者',
        value: data && data.author || '',
        required: true,
        order: 12
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
