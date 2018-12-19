import { Injectable } from '@angular/core';

import {
  FormBase,
  FormText,
  FormFile,
  FormTextarea,
  FormDropdown
} from '../../../../entities';

@Injectable()
export class DoctorFormService {

  setForm(
    hospitals: Array < any > ,
    departments: Array < any > ,
    doctorTitles: Array < any > ,
    data ? : any
  ) {

    let forms: FormBase < any > [] = [];

    if (data && data.key === 'edit') {
      forms.push(
        new FormText({
          key: 'id',
          label: '#',
          value: data && data.value && data.value.id || '',
          type: 'hidden',
          required: true,
          order: 0
        }),
        new FormText({
          key: 'tel',
          label: '手机号',
          value: data && data.value && data.value.tel || '',
          type: 'hidden',
          required: true,
          order: 1
        }))
    } else if (data && data.key === 'failureEdit') {
      forms.push(
        new FormText({
          key: 'id',
          label: '#',
          value: data && data.value && data.value.id || '',
          type: 'hidden',
          required: true,
          order: 0
        }),
        new FormText({
          key: 'tel',
          label: '手机号',
          value: data && data.value && data.value.tel || '',
          type: 'hidden',
          required: true,
          order: 1
        }),
        new FormFile({
          key: 'doctorTitleImg',
          label: '职称证明或医院工牌',
          value: data && data.value && data.value.doctorTitleImg || '',
          required: true,
          order: 7
        }))
    } else {
      forms.push(
        new FormText({
          key: 'tel',
          label: '手机号',
          value: data && data.value && data.value.tel || '',
          required: true,
          order: 1
        }),
        new FormFile({
          key: 'doctorTitleImg',
          label: '职称证明或医院工牌',
          value: data && data.value && data.value.doctorTitleImg || '',
          required: true,
          order: 7
        }))
    }

    forms.push(
      new FormText({
        key: 'name',
        label: '医生姓名',
        value: data && data.value && data.value.name || '',
        required: true,
        validated: true,
        order: 2
      }),
      new FormFile({
        key: 'headPortrait',
        label: '医生头像',
        value: data && data.value && data.value.headPortrait || '',
        order: 3
      }),
      new FormDropdown({
        key: 'hospitalId',
        label: '所属医院',
        value: data && data.value && data.value.hospitalId || '',
        required: true,
        options: hospitals,
        order: 4
      }),
      new FormDropdown({
        key: 'departmentId',
        label: '所属科室',
        value: data && data.value && data.value.departmentId || '',
        required: true,
        options: departments,
        order: 5
      }),
      new FormDropdown({
        key: 'doctorTitleId',
        label: '职称',
        value: data && data.value && data.value.doctorTitleId || '',
        required: true,
        options: doctorTitles,
        order: 6
      }),
      new FormTextarea({
        key: 'goodAt',
        label: '擅长',
        value: data && data.value && data.value.goodAt || '',
        required: false,
        order: 8
      }),
      new FormTextarea({
        key: 'practiceExperience',
        label: '执业经历',
        value: data && data.value && data.value.practiceExperience || '',
        required: false,
        order: 9
      }))

    return forms.sort((a, b) => a.order - b.order);
  }
}
