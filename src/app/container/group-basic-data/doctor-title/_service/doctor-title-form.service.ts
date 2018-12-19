import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown } from '../../../../entities';

@Injectable()
export class DoctorTitleFormService {

  setDoctorTitleForm( positionalTitle ? : any) {

    let disable: boolean = false;
    let positionalTitleforms: FormBase<any>[] = [];
    if (positionalTitle) {
      disable = true;
      positionalTitleforms.push(
        new FormText({
          key: 'id',
          label: '职称ID',
          value: positionalTitle && positionalTitle.id || '',
          disable: disable,
          required: true,
          type: "hidden",
          order: 0
        })
      );
    }


    positionalTitleforms.push(
      new FormText({
        key: 'name',
        label: '职称名称',
        value: positionalTitle && positionalTitle.name || '',
        required: true,
        order: 1
      })
     
    );

    return positionalTitleforms.sort((a, b) => a.order - b.order);
  }
}