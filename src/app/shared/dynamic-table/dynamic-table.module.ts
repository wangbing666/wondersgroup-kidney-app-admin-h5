import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicTable } from './dynamic-table';
import { PageMenu } from './page-menu';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DynamicTable,
    PageMenu
  ],
  exports: [
    DynamicTable,
    PageMenu
  ]
})
export class DynamicTableModule {}
