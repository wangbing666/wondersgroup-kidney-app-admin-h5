import { Injectable } from '@angular/core';

import {
  FormBase,
  FormText,
  FormFile,
  FormTextarea,
  FormDropdown
} from '../../../entities';

@Injectable()
export class ReadCoefficientFormService {

  ReadCoefficientForm(readcoefficient ? : any) {

    let readcoefficientforms: FormBase < any > [] = [];
    if(readcoefficient.quantity === "reading"){
      console.log(readcoefficient);

      readcoefficientforms.push(
        new FormDropdown({
          key: 'type',
          label: '请选择类别',
          value: readcoefficient && readcoefficient.reading[0].type || '',
          options: [{
            id: "patient",
            name: '患者端'
          }, {
            id: "doctor",
            name: '医生端'
          }],
          required: true,
          order: 1
        }),
        new FormText({
          key: 'parameter',
          label: '配置阅读量系数',
          value: readcoefficient && readcoefficient.reading[0].parameter || '',
          required: true,
          order: 2
        }),
        new FormText({
          key: 'id',
          label: '',
          value: readcoefficient && readcoefficient.reading[0].id || '',
          required: true,
          type: "hidden",
          order: 3
        })
      );
    }else{
      readcoefficientforms.push(
        new FormText({
          key: 'parameter',
          label: '配置医生端点赞量参数',
          value: readcoefficient && readcoefficient.reading[0].parameter || '',
          required: true,
          order: 1
        }),
        new FormText({
          key: 'id',
          label: '',
          value: readcoefficient && readcoefficient.reading[0].id || '',
          required: true,
          type: "hidden",
          order: 2
        }),
        new FormText({
          key: 'type',
          label: '',
          value: readcoefficient && readcoefficient.reading[0].type || '',
          required: true,
          type: "hidden",
          order: 3
        })
      );
    }
    

    return readcoefficientforms.sort((a, b) => a.order - b.order);
  }

}
