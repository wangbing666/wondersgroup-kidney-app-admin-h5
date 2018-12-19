import { Injectable, Inject } from '@angular/core';

import {
  FormBase,
  FormText,
  FormFile,
  FormTextarea
} from '../../../../entities';

@Injectable()
export class AdDoctorFormService {

  constructor(@Inject('admin') private admin) {}

  setAdDoctorForm(forms ? : any) {
    let disable: boolean = false;
    let readonly: boolean = false;
    let ad: FormBase < any > [] = [];
    
    ad.push(
      new FormFile({
        key: 'imageURL',
        label: '广告图片',
        value: forms && forms.imageURL || '',
        required: false,
        order: 1
      })

    );

    ad.push(
      new FormText({
        key: 'adsenseName',
        label: '广告标题',
        value: forms && forms.adsenseName || '',
        required: true,
        maxlength: "16",
        readonly:readonly,
        order: 2
      })
    );

    ad.push(
      new FormText({
        key: 'adsenseURL',
        label: '广告链接',
        value: forms && forms.adsenseURL || '',
        required: true,
        order: 3
      })
    );  

    ad.push(
      new FormText({
        key: 'recommend',
        label: '推荐值',
        value: forms && forms.recommend || '',
        required: false,
        order: 4
      })
    );

    return ad.sort((a, b) => a.order - b.order);
  }
}
