import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';

@Component({
  selector: 'chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})

export class ChartPieComponent implements OnChanges {
  
  @Input() show: boolean;
  @Input() workSheet: IWorksheet;
  chartOption: any;

  echartsInstance: any;
  
  constructor(){
    this.show = false;
  }

  ngOnChanges(changes: SimpleChanges): void {

    setTimeout((e) => {
      this.showChart();
    }, 100);
   
  }

  onChartInit(e: any) {
    this.echartsInstance = e;

  }

  
  showChart(): void{

    if(!this.workSheet){
      return;
    }

    let firstLevel = 'Owner Department';
    let secondLevel = 'Strategic Objective';
    let scale = 'Weight';

    let firstNodes: any[] = [];
    let secondNodes: any[] = [];

    let columnData = this.workSheet.Values.forEach(row => {

      let firstValue = row[firstLevel];
      let secondValue = row[secondLevel];

      if(firstNodes.find(d => d.name == firstValue)){

        if($.isNumeric(row[scale])){
          firstNodes.find(d => d.name == firstValue).value += row[scale];
        }
        else{
          firstNodes.find(d => d.name == firstValue).value += 1;
        }
      }
      else{

        let scaleValue = 1;
        if($.isNumeric(row[scale])){
            scaleValue = row[scale];
        }

        firstNodes.push({
            name: firstValue,
            value: scaleValue
        });
      }

      if(secondNodes.find(d => d.name == secondValue)){

        if($.isNumeric(row[scale])){
          secondNodes.find(d => d.name == secondValue).value += row[scale];
        }
        else{
          secondNodes.find(d => d.name == secondValue).value += 1;
        }
      }
      else{
        
        let scaleValue = 1;
        if($.isNumeric(row[scale])){
            scaleValue = row[scale];
        }

        secondNodes.push({
            name: secondValue,
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
            name: firstLevel,
            type:'pie',
            radius : [30, 110],
            center : ['50%', '50%'],
            roseType : 'area',
            data: firstNodes
        }
    ]
    };
  }
  

  

}