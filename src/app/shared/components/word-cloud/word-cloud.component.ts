import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';

@Component({
  selector: 'word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})

export class WordCloudComponent implements OnChanges {
  
  @Input() workSheet: IWorksheet;
  chartOption: any;
  
  constructor(){
  }

  ngOnChanges(changes: SimpleChanges): void {

    setTimeout((e) => {
      this.showChart();
    }, 100);
   
  }

  
  showChart(): void{

    if(!this.workSheet){
      return;
    }

    let words: any[] = [];
    this.workSheet.Headers.forEach(column => {
      let columnData = this.workSheet.Values.forEach(row => {

        let splitWords = row[column].toString().split(" ");

        splitWords.forEach(word => {

          if(words.find(d => d.name == word)){
            words.find(d => d.name == word).value += 1;
          }
          else{
            words.push({
              name: word,
              value: 1,
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