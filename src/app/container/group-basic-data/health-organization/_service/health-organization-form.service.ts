import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown } from '../../../../entities';

@Injectable()
export class HealthFormService {

  setThirdPartyForm( thirdParty ? : any) {

    let thirdPartyforms: FormBase<any>[] = [];
    if (thirdParty) {
      thirdPartyforms.push(
        new FormText({
          key: 'id',
          label: '机构ID',
          value: thirdParty && thirdParty.id || '',
          required: true,
          type: "hidden",
          order: 0
        })
      );
    }

    thirdPartyforms.push(
      new FormFile({
        key: 'headPortrait',
        label: '机构图片',
        value: thirdParty && thirdParty.headPortrait || '',
        accept: 'image/*',
        required: false,
        order: 1
      })
     
    );

    thirdPartyforms.push(
      new FormText({
        key: 'name',
        label: '机构名称',
        value: thirdParty && thirdParty.name || '',
        required: true,
        order: 2
      })
     
    );

    return thirdPartyforms.sort((a, b) => a.order - b.order);
  }
}