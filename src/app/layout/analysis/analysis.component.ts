import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

import { SpeechService } from '../../shared/services/speech.service';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IWorkbook, IWorksheet } from '../../shared/models/workbook';
import { ChartParam } from '../../shared/models/chart-param';
import { ListenerBase } from '../listener-base';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent extends ListenerBase implements OnInit, OnDestroy, AfterViewInit {

  logs: string[];

  tabIndex: number;
  
  workbook: IWorkbook;
  headers: string[];
  workSheet: IWorksheet;

  showDiagram: number;

  filter: string;
  sortColumn: any;
  page: number;
  

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
  constructor(public svcSpeech: SpeechService){
    super(svcSpeech);

    this._listenCommon();

    this.showDiagram = 0;
    this.logs = [];
    this.tabIndex = 0;
  }

  ngOnInit() {
    this.svcSpeech.init();
  }

  
  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  

  onFocusedTabChanged(e): void{

    this.tabIndex = e.index;

    switch(e.index){

      case 0:
      break;

      case 1: // chart tab
        
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

    this.logs = this.logs.concat(this.workbook.Sheets.map(sheet => {return sheet.Name;}));

    //this.svcSpeech.startListening();

  }

  private _listenCommon() {
    this.commonSubs = this.svcSpeech.command$
      .filter(obj => obj.type === 1)
      .map(command => command.param)
      .subscribe(
        param => {
          super._setError();
          
          switch(param){
            case 'analyze':
            break;
            case 'dash':
            break;
            case 'data':
            default:
              this.tabIndex = 0;
            break;
          }
        }
      );
  }


  private _dummyCall(param:string):void {

    switch(param){

      // common
      case 'Go Data':
        this.tabIndex = 0;
      break;
      case 'Go Analyze':
        this.tabIndex = 1;
      break;
      case 'Go Dash':
        this.tabIndex = 2;
      break;
      
      // data tab
      case 'Filter contains':
        this.page = 0;
        this.filter = 'achieve'
      break;
      case 'Remove filter':
        this.page = 0;
        this.filter = '';
      break;
      case 'Sort by':
        this.sortColumn = {sort: true, id:'Owner Department', direction:'asc'};
      break;
      case 'Remove sort':
        this.sortColumn = {sort: false, id:'', direction:''};
      break;
      case 'Go to page':
        this.page = 2;
      break;

      // analyze tab
      case 'Show line':
        this.showDiagram = 1;
      break;
      case 'Show pie':
        this.showDiagram = 2;
      break;
      case 'Show word':
        this.showDiagram = 3;
      break;
      case 'Show force':
        this.showDiagram = 4;
      break;
    }
  }

}