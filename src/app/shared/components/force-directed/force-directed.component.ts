import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';
import { ForceDirectedParam } from '../../models/force-directed-param';

@Component({
  selector: 'force-directed',
  templateUrl: './force-directed.component.html',
  styleUrls: ['./force-directed.component.css']
})

export class ForceDirectedComponent implements OnChanges {
  
  @Input() workSheet: IWorksheet;
  @Input() param: ForceDirectedParam;

  chartOption: any;

  echartsInstance: any;

  nodes: any[] = [];
  connections: any[] = [];
  
  constructor(){
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.param && changes.param.currentValue != null){
      setTimeout((e) => {

        this.showChart();
      }, 100);
    }
   
  }

  onChartInit(e: any) {
    this.echartsInstance = e;
  }


  getNodes(row, currentLevel, levels){

    if(this.param.Focus.trim() != '' && !row[this.param.Levels[0]].toLowerCase().includes(this.param.Focus.toLowerCase())){
        return;
    }

    let nodeText = row[currentLevel];
    let nodeName = row[currentLevel] + '_' + currentLevel;

    if(this.nodes.find(n => n.name == nodeName)){

        if(this.param.Scale != 'none' && $.isNumeric(row[this.param.Scale])){
            this.nodes.find(n => n.name == nodeName).value += row[this.param.Scale];
            this.nodes.find(n => n.name == nodeName).symbolSize += row[this.param.Scale];
        }
    }
    else{
    
      let scaleValue = 0;
      if(this.param.Scale != 'none' && $.isNumeric(row[this.param.Scale])){
          scaleValue = row[this.param.Scale];
      }
    
      this.nodes.push({
          name: nodeName,
          label: nodeText,
          symbolSize: 1 + scaleValue,
          draggable: "true",
          category: this.param.Levels.indexOf(currentLevel),
          value: scaleValue,
          type: 0 // 0 means node, 1 means link 
      });

      if(levels.length > 0){
          let prvLevel = levels[levels.length - 1];
          let prvNodeText = row[prvLevel];
          let prvNodeName = row[prvLevel] + '_' + prvLevel;
  
          if(prvNodeName && nodeName && !this.connections.find(connection => connection.source == prvNodeName && connection.target == nodeName)){
            this.connections.push({
                source: prvNodeName,
                target: nodeName,
                sourceLabel: prvNodeText,
                targetLabel: nodeText,
                type: 1 // 0 means node, 1 means link 
            });
          }
      }
    }

  }

  showChart(): void{

    if(!this.workSheet){
      return;
    }

    this.nodes = [];
    this.connections = [];
    
    let columnData = this.workSheet.Values.forEach(row => {

      let levels = [];

      this.param.Levels.forEach(level => {
        this.getNodes(row, level, levels);
        levels.push(level);
      });
      
    });

    let allSymbolSizes = this.nodes.map(node => {return node.symbolSize;});
    let min = Math.min(...allSymbolSizes);
    let max = Math.max(...allSymbolSizes);

    console.log(this.nodes);

    console.log(min);
    console.log(max);

    this.nodes = this.nodes.map(node => {
        let numerator = node.symbolSize - min;
        let denominator = max - min
        if(numerator == 0 && denominator == 0){
            node.symbolSize = 20;
            return node;
        }

        node.symbolSize = (numerator / denominator) * 100;
        return node;
    });

    console.log(this.nodes);

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
          data: this.nodes,
          links: this.connections,
          categories: this.param.Levels.map(level => { return {name: this.param.Levels.indexOf(level)};}),
          focusNodeAdjacency: true,
          roam: true,
          label: {
              show: true,
              position: 'top',
              formatter: (params) => {
                  // if node else link
                  if(params.data.type == 0){
                    return params.data.label;
                  }
                  else{
                    return params.data.sourceLabel + " - " + params.data.targetLabel
                  }
              }
          },
          tooltip: {
              formatter: (params) => {  
                if(params.data.type == 0){
                    return params.data.label + ': ' + params.data.value ;
                  }
                  else{
                    return params.data.sourceLabel + " - " + params.data.targetLabel
                  }
                  
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