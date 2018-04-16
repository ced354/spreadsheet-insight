import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

import { SpeechService } from '../../shared/services/speech.service';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IWorkbook, IWorksheet } from '../../shared/models/workbook';
import { ChartParam } from '../../shared/models/chart-param';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit, OnDestroy, AfterViewInit {

  dataSource: MatTableDataSource<any>;
  workbook: IWorkbook;
  headers: string[];
  workSheet: IWorksheet;

  showChartBasic: boolean;
  alwaysShow: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Five', cols: 1, rows: 2, color: '#DDBDF1'},
    {text: 'Six', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Seven', cols: 1, rows: 3, color: '#DDBDF1'},
  ];

  dashParams: ChartParam[] = [];
  
  /**
    * Constructor
  */
  constructor(){
    this.showChartBasic = false;
  }

  ngOnInit() {
    
  }

  
  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onFocusedTabChanged(e): void{

    this.showChartBasic = false;

    switch(e.index){

      case 0:
      break;

      case 1: // chart tab
        this.showChartBasic = true;
      break;

      default:
      break;
    }
  }
  
  
  onWorkbookChanged(e): void {
    this.workbook = e;
    this.headers = this.workbook.Sheets[2].Headers;
    this.workSheet = this.workbook.Sheets[2];

    this.dashParams = [];
    this.dashParams.push({
      Sheet: this.workSheet,
      Type: 1
    });
    this.dashParams.push({
      Sheet: this.workSheet,
      Type: 2
    });
    this.dashParams.push({
      Sheet: this.workSheet,
      Type: 3
    });
    this.dashParams.push({
      Sheet: this.workSheet,
      Type: 4
    });

    this.dataSource = new MatTableDataSource(this.workbook.Sheets[2].Values);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getValue(iKey, iRow): string {
    return iRow[iKey];
  }

}