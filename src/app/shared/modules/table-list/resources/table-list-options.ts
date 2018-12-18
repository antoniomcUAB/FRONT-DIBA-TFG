import {Observable, of} from 'rxjs';

export class TableListOptions {
  sort = '';
  totalItems = 0;
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;
  loading = false;
  pagination = true;
  columns: Array<ColumnListOptions> = [];
  filterable = true;
  sortable = true;
  footer = true;
  header = true;
  actions = true;
  editBtn = true;
  deleteBtn = true;

  setColumns(cols: any[]) {
    const tmpCols = [];
    for (const col of cols) {
      tmpCols.push(Object.assign(new ColumnListOptions(), col));
    }
    this.columns = tmpCols;
  }

  getPagesInfo(tableResponse) {
    this.totalItems = tableResponse.totalElements;
    this.totalPages = tableResponse.totalPages;
    this.currentPage = tableResponse.number + 1;
    this.itemsPerPage = tableResponse.size;
  }

  get searchParams(): any {
    const searchParams = {};
    // Pagination params
    if (this.pagination) {
      searchParams['page'] = this.currentPage - 1;
      searchParams['size'] = this.itemsPerPage;
    }
    // Sort params
    if (this.sort) {
        if (this.sort.startsWith('-')) {
          searchParams['sort'] = this.sort.slice(1) + ',desc';
        } else {
          searchParams['sort'] = this.sort.slice(0) + ',asc';
        }
        // searchParams['sort'] = this.sort;
      }
    // Filter params
    const filtersArray = [];
    for (const column of this.columns) {
      if (column.filterable && column.filter) {
        filtersArray.push(column.name);
        searchParams[column.name] = column.filter;
      }
    }
    const filters = filtersArray.join(',');
    if (filters.length !== 0) {
      searchParams['filters'] = filters;
    }
    return searchParams;
  }
}

export class ColumnListOptions {
  name: string;
  title: string;
  sortable = true;
  filterType: FilterType = FilterType.text;
  filterable = true;
  filter: string;
}

export class TableListResponse {
  data: any[] = [];
  options: TableListOptions;

  static emptyResponseWithOptions(options: TableListOptions): Observable<TableListResponse> {
    options.totalItems = 0;
    options.totalPages = 1;
    options.currentPage = 1;
    return of({data: [], options: options});
  }
}

export enum SortDir {
  NON,
  ASC,
  DESC
}

export enum FilterType {
  date,
  number,
  text,
  reportCode,
  companyCodeCaptio,
  fileStatus,
  paymentMethod,
  employeeCode,
  companyPaymentAccountActive,
  companyPaymentAccountByDefault,
  SedeOrRed,
  transfers_fileStatus,
  uploadedFileType
}
export enum FileStatus {
  TOPROCESS,
  UPLOADING,
}
export enum RowStatus {
  TOPROCESS,
  ERROR,
  PAID,
  EXCEPTION,
  ADDED,
}
export enum TransfersFileStatus {
  ERROR,
  SENT
}
