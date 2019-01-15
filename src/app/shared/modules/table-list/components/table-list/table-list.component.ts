import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {ColumnListOptions, SortDir, TableListOptions} from '../../resources/table-list-options';
import {ContextMenuComponent} from 'ngx-contextmenu';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: [ './table-list.component.scss' ]
})
export class TableListComponent {
  SortDir = SortDir;
  @ViewChild(ContextMenuComponent) public contextMenuComponent: ContextMenuComponent;
  @Input() options: TableListOptions;
  @Input() tClass: string;
  @Input() rowTemplate: TemplateRef<any>;
  @Input() actionTemplate: TemplateRef<any>;
  @Input('tableData') data: any[];
  @Output('reloadData') reloadDataEvent = new EventEmitter();
  @Output('onEdit') editEvent = new EventEmitter();
  @Output('onDelete') deleteEvent = new EventEmitter();
  @Output('onSelect') selectEvent = new EventEmitter();
  @Input() filesSelected: string[];

  constructor() {
  }

  reloadDataAndPagination() {
    this.changePage(1);
  }

  changePage(page: number) {
    this.options.currentPage = page;
    this.reloadData();
  }

  reloadData() {
    this.reloadDataEvent.emit();
  }

  filter(column: ColumnListOptions, filter: string) {
    if (!column.filterable) {
      return;
    }
    column.filter = filter;
    this.reloadDataAndPagination();
  }

  // START SORT
  changeSort(column: ColumnListOptions): void {
    if (!column.sortable) {
      return;
    }
    if (this.options.sort !== column.name && this.options.sort !== '-' + column.name) {
      this.options.sort = column.name;
    } else {
      if (this.options.sort === column.name) {
        this.options.sort = '-' + column.name;
      } else {
        this.options.sort = column.name;
      }
    }
    this.options.currentPage = 1;
    this.reloadDataAndPagination();
  }

  getSortStatus(attr: string): SortDir {
    if (this.options.sort.indexOf(attr) !== -1) {
      if (this.options.sort === '-' + attr) {
        return SortDir.DESC;
      } else {
        return SortDir.ASC;
      }
    } else {
      return SortDir.NON;
    }
  }

  // END SORT

  //  ACTIONS
  edit(item: any, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.editEvent.emit(item);
  }
  delete(item: any, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    // TODO implement new modal
    // this._modal.confirm()
    //   .message(this._translateService.instant('MODALS.confirmDel'))
    //   .className('plain')
    //   .isBlocking(true)
    //   .open()
    //   .then(data => {
    //     data.result.then(result => {
    //       if (result === true) {
            this.deleteEvent.emit(item);
    //       }
    //     }).catch(() => {
    //     });
    //   });
  }
  //  END ACTIONS

}
