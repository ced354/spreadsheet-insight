import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';
import { ChartPieParam } from '../../models/chart-pie-param';

@Component({
  selector: 'chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})

export class ChartPieComponent implements OnChanges {
  
  @Input() workSheet: IWorksheet;
  @Input() param: ChartPieParam;

  

  currentLevel: number;

  chartOption: any;

  echartsInstance: any;

  drillHistory: any;
  
  constructor(){

    this.currentLevel = 0;
    this.drillHistory = [];
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.param && changes.param.currentValue != null){

      setTimeout((e) => {
        
        this.currentLevel = 0;
        this.drillHistory = [];

        this.showChart();
      }, 100);
    }
    
  }

  onChartInit(e: any) {
    this.echartsInstance = e;

    this.echartsInstance.on('click', (param) => {

      if(this.currentLevel == this.param.Levels.length - 1){
        return;
      }
      
      if(param.seriesIndex == 0){
        this.drillHistory = [{seriesName:param.seriesName, name:param.name}];
      }
      else{
        this.drillHistory.push({seriesName:param.seriesName, name:param.name});
      }
      
      this.currentLevel += 1;
      this.showChart();
    });

  }

  onDrillUp(): void{

    if(this.currentLevel > 0){
      this.currentLevel -= 1;

      this.drillHistory.pop();
      this.showChart();
    }
  }
  
  showChart(): void{

    if(!this.workSheet){
      return;
    }

    let level = this.param.Levels[this.currentLevel];
    let scale = this.param.Scale;

    let levelNodes: any[] = [];

    let columnData = this.workSheet.Values.forEach(row => {

      let isInclude = true;
      this.drillHistory.forEach(history => {
        if(row[history.seriesName] != history.name){
          isInclude = false;
        }
      });

      if(!isInclude){
        return;
      }

      let value = row[level];

      if(levelNodes.find(d => d.name == value)){

        if(scale != 'none' && $.isNumeric(row[scale])){
          levelNodes.find(d => d.name == value).value += row[scale];
        }
        else{
          levelNodes.find(d => d.name == value).value += 1;
        }
      }
      else{

        let scaleValue = 1;
        if(scale != 'none' && $.isNumeric(row[scale])){
            scaleValue = row[scale];
        }

        levelNodes.push({
            name: value,
            value: scaleValue
        });
      }
    });


    /* drill down
    let newOption = {
      series: [
        {
          name: firstLevel,
          type: 'pie',
          radius: [30, 110],
          center: ['50%', '50%'],
          roseType: 'area',
          data: firstNodes
        }
      ]
    };

    this.echartsInstance.on('click', (param) => {
      this.echartsInstance.setOption(newOption, true);
    });
    */


    this.chartOption = {
      title : {
        text: '南丁格尔玫瑰图',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name: level,
            type:'pie',
            radius : [30, 110],
            center : ['50%', '50%'],
            roseType : 'area',
            data: levelNodes
        }
    ]
    };
  }
  

  

}