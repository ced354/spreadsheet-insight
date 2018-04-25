import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';
import { WordCloudParam } from '../../models/word-cloud-param';

@Component({
  selector: 'word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})

export class WordCloudComponent implements OnChanges {
  
  @Input() workSheet: IWorksheet;
  @Input() param: WordCloudParam;
  chartOption: any;
  
  constructor(){
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

  
  showChart(): void{

    if(!this.workSheet){
      return;
    }

    if(!this.param){
      return;
    }

    let scale = this.param.Scale;

    let words: any[] = [];
    this.param.Columns.forEach(column => {
      let columnData = this.workSheet.Values.forEach(row => {

        let splitWords = [];
        if(scale == 'none'){
          splitWords = row[column].toString().split(" ");
        }
        else{
          splitWords = [row[column]];
        }

        let scaleValue = 1;
        if(scale != 'none' && $.isNumeric(row[scale])){
            scaleValue = row[scale];
        }

        splitWords.forEach(word => {

          if(words.find(d => d.name == word)){
            words.find(d => d.name == word).value += scaleValue;
          }
          else{

            words.push({
              name: word,
              value: scaleValue,
              // Style of single text
              textStyle: {
                normal: {},
                emphasis: {}
              }
            });
          }

        });

      });
    });

    this.chartOption = {
        title:{
            text:"词云图",
            link:'https://github.com/ecomfe/echarts-wordcloud',
            subtext: 'data-visual.cn',
            sublink:'http://data-visual.cn',
        },
        tooltip: {},
        series: [{
            type: 'wordCloud',
            gridSize: 20,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            rotationStep: 90,
            drawOutOfBound: false,
            shape: 'circle',
            textStyle: {
                normal: {
                    color: function() {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: words
        }]
    };
  }
  

  

}