import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';

@Component({
  selector: 'chart-basic',
  templateUrl: './chart-basic.component.html',
  styleUrls: ['./chart-basic.component.css']
})

export class ChartBasicComponent implements OnChanges {
  
  @Input() show: boolean;
  @Input() workSheet: IWorksheet;
  chartOption: any;
  
  constructor(){
    this.show = false;
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

    console.log(this.workSheet.Values);

    let seriesData: any[] = [];

    let xData = this.workSheet.Values.map(row => {
      return row['Strategic Objective'];
    });

    this.workSheet.Headers.forEach(column => {
      let columnData = this.workSheet.Values.map(row => {
        if($.isNumeric(row[column])){
          return row[column];
        }
        else{
          return 0;
        }
      });

      let data = {
        name: column,
        type: 'line',
        stack: this.workSheet.Name,
        data: columnData
      };

      seriesData.push(data);
    });

    console.log(seriesData);
    this.chartOption = {
      title: {
        text: '堆叠区域图'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data: this.workSheet.Headers
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : xData,
          axisLabel : {
            inside: true,
            rotate : 90
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series: seriesData
      //series : [
      //  {
      //    name:'邮件营销',
      //    type:'line',
      //    stack: '总量',
      //    areaStyle: {normal: {}},
      //    data:[120, 132, 101, 134, 90, 230, 210]
      //  },
      //  {
      //    name:'联盟广告',
      //    type:'line',
      //    stack: '总量',
      //    areaStyle: {normal: {}},
      //    data:[220, 182, 191, 234, 290, 330, 310]
      //  },
      //  {
      //    name:'视频广告',
      //    type:'line',
      //    stack: '总量',
      //    areaStyle: {normal: {}},
      //    data:[150, 232, 201, 154, 190, 330, 410]
      //  },
      //  {
      //    name:'直接访问',
      //    type:'line',
      //    stack: '总量',
      //    areaStyle: {normal: {}},
      //    data:[320, 332, 301, 334, 390, 330, 320]
      //  },
      //  {
      //    name:'搜索引擎',
      //    type:'line',
      //    stack: '总量',
      //    label: {
      //      normal: {
      //        show: true,
      //        position: 'top'
      //      }
      //    },
      //    areaStyle: {normal: {}},
      //    data:[820, 932, 901, 934, 1290, 1330, 1320]
      //  }
      //]
      };
  }
  

  

}