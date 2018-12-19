import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown } from '../../../../entities';

@Injectable()
export class DoctorServiceFormService {

  setForm(data ? : any) {

    let forms: FormBase<any>[] = [];

    forms.push(
      new FormText({
        key: 'groupName',
        label: '医生小组名称',
        value: data && data.groupName || '',
        disable: true,
        order: 1
      }),
      new FormText({
        key: 'name',
        label: '组长',
        value: data && data.name || '',
        disable: true,
        order: 2
      }),
      new FormText({
        key: 'managerNames',
        label: '管理员',
        value: data && data.managerNames || '',
        disable: true,
        order: 3
      }),
      new FormText({
        key: 'memberNames',
        label: '小组成员',
        value: data && data.memberNames || '',
        disable: true,
        order: 4
      }),
      new FormTextarea({
        key: 'description',
        label: '小组简介',
        value: data && data.description || '',
        required: true,
        order: 5
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}