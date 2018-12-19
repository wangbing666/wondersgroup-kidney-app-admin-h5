import { Injectable } from '@angular/core';
import { TableTitle } from '../../../../entities';

@Injectable()
export class RegisterStatisticsTableService {
  
  setUserTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '日期',
        key: 'date'
      }),
      new TableTitle({
        name: '注册数量',
        key: 'size'
      }),
    ];
    return Titles;
  }

  setDoctorTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '日期',
        key: 'date'
      }),
      new TableTitle({
        name: '注册数量',
        key: 'size'
      }),
      new TableTitle({
        name: '审核通过',
        key: 'accessCount'
      }),  
    ];
    return Titles;
  }
}