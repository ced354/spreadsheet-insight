import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

import { SpeechService } from '../../shared/services/speech.service';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IWorkbook, IWorksheet } from '../../shared/models/workbook';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
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

    console.log(this.headers);

    this.dataSource = new MatTableDataSource(this.workbook.Sheets[2].Values);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getValue(iKey, iRow): string {
    return iRow[iKey];
  }

}