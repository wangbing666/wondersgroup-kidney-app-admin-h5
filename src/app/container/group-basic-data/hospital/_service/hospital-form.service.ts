import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown } from '../../../../entities';

@Injectable()
export class HospitalFormService {

  setHospitalForm( hospital ? : any) {

    let hospitalforms: FormBase<any>[] = [];
    if (hospital) {
      hospitalforms.push(
        new FormText({
          key: "id",
          label: '医院ID',
          value: hospital && hospital.id || '',
          required: true,
          type: "hidden",
          order: 0
        })
      );
    }
    hospitalforms.push(
      new FormText({
        key: 'name',
        label: '医院名称',
        value: hospital && hospital.name || '',
        required: true,
        order: 1
      })
     
    );

    return hospitalforms.sort((a, b) => a.order - b.order);
  }
}