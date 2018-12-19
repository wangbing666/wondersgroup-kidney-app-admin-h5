import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'page-menu',
  templateUrl: 'page-menu.html',
  styleUrls: ['page-menu.css']
})
export class PageMenu implements OnInit {
  @Input() totalPages;
  @Input() currentPage;

  @Output() pageEmitter = new EventEmitter();

  pageList: Array < any > = [];

  constructor() {}

  ngOnInit() {
    this.getPageList(this.totalPages, this.currentPage);
  }

  getPageList(total, current) {
    this.pageList = [];
    if (total <= 6) {
      for (let i = 0; i < total; i++) {
        this.pageList.push(i + 1);
      }
    } else if (total > 6) {
      if (current + 1 === 1) {
        this.pageList.push(1, current + 2, '...', total);
      } else if (current + 1 === 2) {
        this.pageList.push(1, current + 1, current + 2, '...', total);
      } else if (current + 1 === total - 1) {
        this.pageList.push(1, '...', current, current + 1, total);
      } else if (current + 1 === total) {
        this.pageList.push(1, '...', current, total);
      } else {
        this.pageList.push(1, '...', current, current + 1, current + 2, '...', total);
      }
    }
  }

  // 获取指定页
  getCurrentPage(page) {
    if (page !== '...') {
      this.pageEmitter.emit(page - 1);
      this.getPageList(this.totalPages, page - 1);
    }
  }

  // 获取前一页
  getPrePage() {
    if (this.currentPage > 0) {
      this.pageEmitter.emit(this.currentPage - 1);
      this.getPageList(this.totalPages, this.currentPage - 1);
    }
  }

  // 获取下一页
  getNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.pageEmitter.emit(this.currentPage + 1);
      this.getPageList(this.totalPages, this.currentPage + 1);
    }
  }

  // 获取第一页
  getFirstPage() {
    this.pageEmitter.emit(0);
    this.getPageList(this.totalPages, 0);
  }

  // 获取最后一页
  getLastPage() {
    this.pageEmitter.emit(this.totalPages - 1);
    this.getPageList(this.totalPages, this.totalPages - 1);
  }

}
