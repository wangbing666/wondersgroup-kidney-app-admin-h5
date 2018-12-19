import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalEdit } from './modal-edit';
import { ModalFull } from './modal-full';
import { ModalImg } from './modal-img';
import { ModalShow } from './modal-show';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ModalEdit,
    ModalFull,
    ModalImg,
    ModalShow
  ],
  exports: [
    ModalEdit,
    ModalFull,
    ModalImg,
    ModalShow
  ]
})
export class ModalModule {}
