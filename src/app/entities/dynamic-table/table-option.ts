import { TableTitle } from './table-title';

export class TableOption {

  titles: TableTitle[];
  lists: Array < any > ;
  totalPage: number;
  currentPage: number;
  size: number;
  errorMessage: string;
  loading: boolean;

  constructor(obj ? ) {
    this.titles = obj && obj.titles || null;
    this.lists = obj && obj.lists || null;
    this.totalPage = obj && obj.totalPage || null;
    this.currentPage = obj && obj.currentPage || null;
    this.size = obj && obj.size || 10;
    this.errorMessage = obj && obj.errorMessage || '';
    this.loading = obj && obj.loading || true;
  }

}
