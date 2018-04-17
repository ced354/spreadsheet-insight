import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'analysis-data',
  templateUrl: './analysis-data.component.html',
  styleUrls: ['./analysis-data.component.css']
})

export class AnalysisDataComponent implements OnChanges {
  
  @Input() workSheet: IWorksheet;
  @Input() filter: string;
  @Input() sortColumn: any;
  @Input() page: number;

  dataSource: MatTableDataSource<any>;
  headers: string[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(){
    this.filter = '';
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.workSheet && changes.workSheet.currentValue != null){
      this.loadData(changes.workSheet.currentValue.Values);
    }

    if(changes.filter && changes.filter.currentValue != null){
      this.filter = changes.filter.currentValue;
      this.onFilterChanged();
    }

    if(changes.sortColumn && changes.sortColumn.currentValue != null){
      this.sort.sort({id:changes.sortColumn.currentValue.id, start:changes.sortColumn.currentValue.direction, disableClear:false});
    }

    if(changes.page && changes.page.currentValue != null){
      this.paginator.pageIndex = changes.page.currentValue;
      this.dataSource.paginator = this.paginator;
    }

  }

  loadData(iData: any[]): void {
    setTimeout((e) => {
      this.headers = this.workSheet.Headers;
      this.dataSource = new MatTableDataSource(iData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);
  }

  onFilterChanged(): void {
    this.applyFilter(this.filter);
  }

  applyFilter(filterValue: string) {

    if(filterValue == null){
      return;
    }

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getValue(iKey, iRow): string {
    return iRow[iKey];
  }

}