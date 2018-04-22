import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

import { SpeechService } from '../../shared/services/speech.service';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IWorkbook, IWorksheet } from '../../shared/models/workbook';
import { ChartParam } from '../../shared/models/chart-param';
import { ListenerBase } from '../listener-base';
import { ChartBasicParam } from '../../shared/models/chart-basic-param';

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

  command: string;
  

  basicParam: ChartBasicParam = new ChartBasicParam();

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

    this.command = '';
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
    //this.headers = this.workbook.Sheets[2].Headers;
    //this.workSheet = this.workbook.Sheets[2];

    this.dashParams = [];
    //this.dashParams.push({
    //  Sheet: this.workSheet,
    //  Type: 1
    //});
    //this.dashParams.push({
    //  Sheet: this.workSheet,
    //  Type: 2
    //});
    //this.dashParams.push({
    //  Sheet: this.workSheet,
    //  Type: 3
    //});
    //this.dashParams.push({
    //  Sheet: this.workSheet,
    //  Type: 4
    //});

    

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

  onKey(param): void {
    if(param.key == 'Enter'){
      this._dummyCall(this.command);
      this.command = '';
    }
  }

  private _dummyCall(param:string):void {
    
    var matches = param.match(/[^[\]]+(?=])/g);
    if (matches) {
      matches.forEach(match => {
        param = param.replace(match, '');
      });
    }

    this.logs = [];
    switch(param){

      // common
      case 'show help':
        let help:string[] = [];
        
        if(this.tabIndex == 0){

          help = ['Go [data/analyze/dash]',
                  'show help',
                  'show sheets',
                  'load []',
                  'search [string]',
                  'clear search',
                  '*Filter by [column] contains [string]',
                  '*Filter by [column] between [number] and [number]',
                  '*Filter by [column] range [date] and [date]',
                  '*Remove filter [column]',
                  'sort [column] [asc/desc]',
                  'remove sort',
                  'page [number]'];

        }
        else if(this.tabIndex == 1){

          if(this.showDiagram == 1){
            help = ['Go [data/analyze/dash]',
                    'show help',
                    'Load [wordcloud/semantic/sentiment/pie/line/column/sankey]',
                    'Line add base [column] [color]',
                    'Line add value [column] [count/sum/ave/min/max]',
                    'Line remove base [column]',
                    'Line remove value [column]',
                    'Line convert [\'column\']',
                    'Line convert [\'line\']',
                    'Line clear',
                    'Line dash'];
          }
          else if(this.showDiagram == 2){
            help = ['Go [data/analyze/dash]',
                    'show help',
                    'Load [wordcloud/semantic/sentiment/pie/line/column/sankey]',
                    'Pie add [column] [count/sum/ave/min/max] [color]',
                    'Pie remove [column]',
                    'Pie move [column] [position]',
                    'Pie clear',
                    'Pie dash'];
          }
          else if(this.showDiagram == 3){
            help = ['Go [data/analyze/dash]',
                    'show help',
                    'Load [wordcloud/semantic/sentiment/pie/line/column/sankey]',
                    'Wordcloud [all/column]',
                    'Wordcloud remove [word]',
                    'Wordcloud reset [word]',
                    'Wordcloud dash'];
          }
          else if(this.showDiagram == 4){
            help = ['Go [data/analyze/dash]',
                    'show help',
                    'Load [wordcloud/semantic/sentiment/pie/line/column/sankey]',
                    'Force add [column] [color]',
                    'Force remove [column] [color]',
                    'Force move [column] [position]',
                    'Force clear',
                    'Force dash'];
          }
          else{
            help = ['Go [data/analyze/dash]',
                    'show help',
                    'show [wordcloud/semantic/sentiment/pie/line/column/sankey]'];
          }
        }
        else if(this.tabIndex == 2){
          help = ['Go [data/analyze/dash]',
                  'show help',
                  'Dash move [temp-name] [position]',
                  'Dash size [temp-name] [1/2/full]'];
        }

        this.logs = help;
      break;
      case 'Go Data':
        this.tabIndex = 0;
      break;
      case 'Go Analyze':
        this.tabIndex = 1;
      break;
      case 'Go Dash':
        this.tabIndex = 2;
      break;
      case 'show sheets':
        this.logs = this.logs.concat(this.workbook.Sheets.map(sheet => {return sheet.Name;}));
      break;
      case 'load []':
        this.headers = this.workbook.Sheets.find(sheet => sheet.Name == matches[0]).Headers;
        this.workSheet = this.workbook.Sheets.find(sheet => sheet.Name == matches[0]);

        console.log(matches[0]);
      break;
      
      // data tab
      case 'search []':
        this.page = 0;
        this.filter = matches[0];
      break;
      case 'clear search':
        this.page = 0;
        this.filter = '';
      break;
      case 'sort [] []':
        this.sortColumn = {sort: true, id:matches[0], direction:matches[1]};
      break;
      case 'remove sort':
        this.sortColumn = {sort: false, id:'', direction:''};
      break;
      case 'page []':
        this.page = +matches[0];
      break;

      // analyze tab
      case 'show columns':
        this.logs = this.headers;
      break;

      case 'show line':
        this.showDiagram = 1;
      break;
      case 'line base [] [] []':
        this.basicParam.Base = {Name: matches[0], Sort: +matches[1], Grouped: (matches[2] == 'true')};

        this.basicParam = JSON.parse(JSON.stringify(this.basicParam));
      break;
      case 'line add [] []':
        if(this.basicParam.Targets && this.basicParam.Targets.length > 0){
          this.basicParam.Targets.push({Name: matches[0], Aggregate: +matches[1]});
        }
        else{
          this.basicParam.Targets = [{Name: matches[0], Aggregate: +matches[1]}];
        }

        this.basicParam = JSON.parse(JSON.stringify(this.basicParam));
      break;
      case 'line remove []':
        let index = this.basicParam.Targets.findIndex(column => column.Name == matches[0]);
        if (index > -1) {
          this.basicParam.Targets.splice(index, 1);
          this.basicParam = JSON.parse(JSON.stringify(this.basicParam));
        }
      break;
      case 'line convert':
        
      break;
      case 'line required':
        this.logs = ['line base [column] [sort:0/1/2] [grouped:true/false]',
                     'line add [column] [aggregate:0(count)/1(sum)/2(ave)/3(min)/4(max)]'];
      break;
      case 'line parameters':
        this.logs = ['Base : ' + this.basicParam.Base.Name];

        this.logs = this.logs.concat(this.basicParam.Targets.map(column => {return 'Target : ' + column.Name;}));
      break;
      case 'line dash':
        
      break;

      



      case 'show pie':
        this.showDiagram = 2;
      break;
      case 'show word':
        this.showDiagram = 3;
      break;
      case 'show force':
        this.showDiagram = 4;
      break;
    }
  }


  source: any;

  /**
   * CHECKS IF ONE ELEMENT LIES BEFORE THE OTHER
  */
  isbefore(a, b) {
    if (a.parentNode == b.parentNode) {
      for (var cur = a; cur; cur = cur.previousSibling) {
        if (cur === b) {
          return true;
        }
      }
    }
    return false;
  }
  /**
 * LIST ITEM DRAP ENTERED
 */
dragenter($event) {
  let target = $event.currentTarget;
  if (this.isbefore(this.source, target)) {
      target.parentNode.insertBefore(this.source, target); // insert before
  }
  else {
      target.parentNode.insertBefore(this.source, target.nextSibling); //insert after
  }
}


/**
* LIST ITEM DRAG STARTED
*/
dragstart($event) {
  this.source = $event.currentTarget;
  $event.dataTransfer.effectAllowed = 'move';
}

}