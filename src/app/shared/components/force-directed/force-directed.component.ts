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
  repulsion: number;
  showThumbLabel: boolean;
  step: number;

  echartsInstance: any;

  nodes: any[] = [];
  connections: any[] = [];
  
  constructor(){

    this.repulsion = 50;
    this.showThumbLabel = true;
    this.step = 1;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.param && changes.param.currentValue != null){
      setTimeout((e) => {

        this.showChart();
      }, 100);
    }

    if(changes.workSheet && changes.workSheet.currentValue != null){
      setTimeout((e) => {

        this.showChart();
      }, 100);
    }
   
  }

  onChartInit(e: any) {
    this.echartsInstance = e;
  }


  getNodes(row, node, levels, index){

    let currentLevel = node.name;
    
    let nodeText = row[currentLevel];
    let nodeName = row[currentLevel] + '_' + currentLevel + '_' + index;

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
          category: currentLevel, //this.param.Levels.indexOf(currentLevel),
          value: scaleValue,
          type: 0 // 0 means node, 1 means link 
      });
    }

    if(levels.length > 0){

        let prvLevel = levels[levels.length - 1];
        let prvNodeText = row[prvLevel];
        let prvNodeName = row[prvLevel] + '_' + prvLevel + '_' + index;

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

    if(node.children){
      node.children.forEach(childNode => {
        levels.push(node.name);


        this.getNodes(row, childNode, levels, index);
      });
    }
    
  }

  showChart(): void{

    if(!this.workSheet){
      return;
    }

    if(!this.param){
      return;
    }

    this.nodes = [];
    this.connections = [];
    
    let columnData = this.workSheet.Values.forEach(row => {

      
      this.param.Nodes.children.forEach((node, index) => {
        let levels = [];
        this.getNodes(row, node, levels, index);
      });
      
    });

    let allSymbolSizes = this.nodes.map(node => {return node.symbolSize;});
    let min = Math.min(...allSymbolSizes);
    let max = Math.max(...allSymbolSizes);

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

    this.changeOptions();

  }

  changeOptions(){
    this.chartOption = {
      title:{
        subtext: this.param.Scale == 'none' ? '' : 'by ' + this.param.Scale,
        top: "top",
        left: "center"
      },
      tooltip: {},
      legend: [{
        formatter: (name) => {
          //return this.echartsInstance.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
          return name;
        },
        tooltip: {
            show: true
        },
        selectedMode: 'false',
        bottom: 20
      }],
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
              repulsion: this.repulsion,
              //edgeLength: 5
          },
          data: this.nodes,
          links: this.connections,
          categories: this.nodes.map(node => {return node.category;})
                                .filter((item, i, ar) => { return ar.indexOf(item) === i; })
                                .map(node => {return {name: node};}),
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