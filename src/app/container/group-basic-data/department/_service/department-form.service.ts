import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown } from '../../../../entities';

@Injectable()
export class DepartmentFormService {

  setDepartmentForm( department ? : any) {

    let departmentforms: FormBase<any>[] = [];
    if (department) {
      departmentforms.push(
        new FormText({
          key: 'id',
          label: '科室ID',
          value: department && department.id || '',
          required: true,
          type: "hidden",
          order: 0
        })
      );
    }

    departmentforms.push(
      new FormText({
        key: 'name',
        label: '科室名称',
        value: department && department.name || '',
        required: true,
        order: 1
      })
     
    );

    return departmentforms.sort((a, b) => a.order - b.order);
  }
}