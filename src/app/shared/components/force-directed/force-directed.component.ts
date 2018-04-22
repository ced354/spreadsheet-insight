import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';

@Component({
  selector: 'force-directed',
  templateUrl: './force-directed.component.html',
  styleUrls: ['./force-directed.component.css']
})

export class ForceDirectedComponent implements OnChanges {
  
  @Input() workSheet: IWorksheet;
  chartOption: any;

  echartsInstance: any;
  
  constructor(){
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

    let firstLevel = 'State';
    let secondLevel = 'Customer Name';
    let scale = 'Customer Name';

    let nodes: any[] = [];
    let connections: any[] = [];
    let columnData = this.workSheet.Values.forEach(row => {

      let firstValue = row[firstLevel];
      let secondValue = row[secondLevel];

      if(nodes.find(d => d.name == firstValue)){

        if($.isNumeric(row[scale])){
            nodes.find(d => d.name == firstValue).value += row[scale];
            nodes.find(d => d.name == firstValue).symbolSize += row[scale];
        }
      }
      else{

        let scaleValue = 0;
        if($.isNumeric(row[scale])){
            scaleValue = row[scale];
        }

        nodes.push({
            name: firstValue,
            symbolSize: 1 + scaleValue,
            draggable: "true",
            category: firstLevel,
            value: scaleValue
        });
      }

      if(nodes.find(d => d.name == secondValue)){

        if($.isNumeric(row[scale])){
            nodes.find(d => d.name == secondValue).value += row[scale];
            nodes.find(d => d.name == secondValue).symbolSize += row[scale];
        }
      }
      else{
        
        let scaleValue = 0;
        if($.isNumeric(row[scale])){
            scaleValue = row[scale];
        }

        nodes.push({
            name: secondValue,
            symbolSize: 1 + scaleValue,
            draggable: "true",
            category: secondLevel,
            value: scaleValue
        });
      }

      if(!connections.find(connection => connection.source == firstValue && connection.target == secondValue) && firstValue && secondValue){
        connections.push({
            source: firstValue,
            target: secondValue
        });
      }
      

    });

    this.chartOption = {
      title:{
        text: "广州大学数据分析",
        subtext: "各学院专业关系-Acring",
        top: "top",
        left: "center"
      },
      tooltip: {},
      //legend: [{
      //        formatter: function (name) {
      //      return this.echartsInstance.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
      //  },
      //  tooltip: {
      //      show: true
      //  },
      //        selectedMode: 'false',
      //        bottom: 20,
      //        data: ['计算机科学与教育软件学院', '地理科学学院', '机械与电气工程学院', '经济与统计学院', '土木工程学院', '新闻与传播学院', '外国语学院', '人文学院', '数学与信息科学学院', '工商管理学院', '法学院', '公共管理学院', '卫斯理安学院', '政治与公民教育学院', '旅游学院', '教育学院', '环境科学与工程学院', '化学化工学院', '物理与电子工程学院', '建筑与城市规划学院', '美术与设计学院', '生命科学学院', '体育学院', '音乐舞蹈学院']
      //}],
      toolbox: {
        show : true,
        feature : {
            dataView : {show: true, readOnly: true},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
      animationDuration: 3000,
      animationEasingUpdate: 'quinticInOut',
      series: [{
          name: '广州大学',
          type: 'graph',
          layout: 'force',

          force: {
              // initLayout: 'circular'
              // gravity: 0
              repulsion: 50,
              //edgeLength: 5
          },
          data: nodes,
          links: connections,
          categories: [{
              name: firstLevel
          },{
              name: secondLevel
          }],
          focusNodeAdjacency: true,
          roam: true,
          label: {
              normal: {

                  show: true,
                  position: 'top',

              }
          },
          lineStyle: {
              normal: {
                  color: 'source',
                  curveness: 0,
                  type: "solid"
              }
          }
      }]
    };
  }
  

  

}