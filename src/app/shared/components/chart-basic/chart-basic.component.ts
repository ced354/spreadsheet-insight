import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';
import { BaseColumn, TargetColumn } from '../../models/chart-basic-param';

@Component({
  selector: 'chart-basic',
  templateUrl: './chart-basic.component.html',
  styleUrls: ['./chart-basic.component.css']
})

export class ChartBasicComponent implements OnChanges {
  
  @Input() workSheet: IWorksheet;
  @Input() baseColumn: BaseColumn;
  @Input() targetColumn: TargetColumn;

  echartsInstance: any;
  chartOption: any;
  
  constructor(){

  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.workSheet && changes.workSheet.currentValue != null){
      setTimeout((e) => {
        this.showChart();
      }, 100);
    }

    if(changes.baseColumn && changes.baseColumn.currentValue != null){
      
    }

    if(changes.targetColumn && changes.targetColumn.currentValue != null){
      
    }

  }

  onChartInit(e: any) {
    this.echartsInstance = e;
  }

  
  getValuesByColumn(row){
    return this.targetColumn.Columns.map(column => {
      return {column: column, value: row[column.Name]}
    });
  }

  showChart(): void{

    if(!this.workSheet){
      return;
    }


    //normal load
    //sorted by one column
    //grouped by one column; aggregate


    // baseColumn
    // sorted?
    // grouped? 

    let dataHolder = this.workSheet.Values.map((row, index) => {
      return {
        id: index,
        name: row['Strategic Objective'],
        value: this.getValuesByColumn(row)
      };
    });

    if(this.baseColumn.Grouped){
      let groupedObj = this.groupBy(dataHolder, "name");

      this.targetColumn.Columns.map(column => {
        return (column) => {
          if(column.Aggregate == 0){
            
          }
        };
      });
    }

    if(this.baseColumn.Sort == 'asc'){
      dataHolder.sort((a,b) => {
        return (a[this.baseColumn.Name] > b[this.baseColumn.Name]) ? 1 : ((b[this.baseColumn.Name] > a[this.baseColumn.Name]) ? -1 : 0);
      });
    }else if(this.baseColumn.Sort == 'desc'){
      dataHolder.sort((a,b) => {
        return (a[this.baseColumn.Name] < b[this.baseColumn.Name]) ? 1 : ((b[this.baseColumn.Name] < a[this.baseColumn.Name]) ? -1 : 0);
      });
    }

    let seriesData: any[] = [];

    let xData = dataHolder.map(data => {
      return data.name;
    });

    //let xData = this.workSheet.Values.map(row => {
    //  return row['Strategic Objective'];
    //});

    this.targetColumn.Columns.forEach(column => {

      this.workSheet.Values.forEach(row => {

        let value = 0;
        if($.isNumeric(row[column.Name])){
          value = row[column.Name];
        }
        
        switch(column.Aggregate){
          case 0:
            dataHolder.find(data => data.name == row[this.baseColumn.Name]).value.push(1);
          break;
          default:
            dataHolder.find(data => data.name == row[this.baseColumn.Name]).value.push(value);
          break;
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

    this.workSheet.Headers.forEach(column => {
      
    });

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

  groupBy(collection, property) {
    var i = 0, val, index,
      values = [], result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1)
        result[index].push(collection[i]);
      else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }

  compare(a,b) {
    if (a.last_nom < b.last_nom)
      return -1;
    if (a.last_nom > b.last_nom)
      return 1;
    return 0;
  }
  
  

  

}