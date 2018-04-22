import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';
import { ChartBasicParam } from '../../models/chart-basic-param';

@Component({
  selector: 'chart-basic',
  templateUrl: './chart-basic.component.html',
  styleUrls: ['./chart-basic.component.css']
})

export class ChartBasicComponent implements OnChanges {
  
  @Input() workSheet: IWorksheet;
  @Input() param: ChartBasicParam;

  echartsInstance: any;
  chartOption: any;
  
  constructor(){

    //this.param.Base = { Name: 'Strategic Objective', Grouped: false, Sort: 0 };
    //this.param.Target = {
    //  Columns: [{Name: 'Weight', Aggregate: 1}, {Name: 'Target % Perfomance', Aggregate: 2}]
    //};
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.param && changes.param.currentValue != null){
      if(changes.param.currentValue.Base && changes.param.currentValue.Base != null){

          if(!this.workSheet || this.workSheet == null){
            return;
          }

          if(!this.param.Targets || this.param.Targets == null){
            this.param.Targets = [];
          }

          setTimeout((e) => {
            this.showChart();
          }, 100);
      }
    }
  }

  onChartInit(e: any) {
    this.echartsInstance = e;
  }

  
  getValuesByColumn(row){
    return this.param.Targets.map(column => {

      let value = 0;
      if($.isNumeric(row[column.Name])){
        value = row[column.Name];
      }

      return {column: column, value: value}
    });
  }

  showChart(): void{

    if(!this.workSheet){
      return;
    }

    let dataHolder = this.workSheet.Values.map((row, index) => {
      return {
        id: index,
        name: row[this.param.Base.Name],
        values: this.getValuesByColumn(row)
      };
    });

    if(this.param.Base.Grouped){
      let groupedObj = this.groupBy(dataHolder, "name");

      dataHolder = groupedObj.map((group, index) => {

        let newDataHolder = {
          id: index,
          name: group[0].name,
          values: group[0].values,
        };

        this.param.Targets.forEach(column => {

          let allColumnValues = group.map(item => {
            return item.values.find(value => value.column.Name == column.Name).value;
          });

          let aggregate: number = 0;
          if(column.Aggregate == 0){
            aggregate = allColumnValues.length;
          } else if(column.Aggregate == 1){
            aggregate = allColumnValues.reduce((a,b) => a + b, 0);
          } else if(column.Aggregate == 2){
            aggregate = allColumnValues.reduce((a,b) => a + b, 0) / allColumnValues.length;
          } else if(column.Aggregate == 3){
            aggregate = Math.min(...allColumnValues);
          } else if(column.Aggregate == 4){
            aggregate = Math.max(...allColumnValues);
          }

          newDataHolder.values.find(value => value.column.Name == column.Name).value = aggregate;
        });

        return newDataHolder;
      });
    }

    if(this.param.Base.Sort == 1){
      dataHolder.sort((a,b) => {
        return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
      });
    }else if(this.param.Base.Sort == 2){
      dataHolder.sort((a,b) => {
        return (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0);
      });
    }

    let seriesData: any[] = [];

    let xData = dataHolder.map(data => {
      return data.name;
    });

    this.param.Targets.forEach(column => {

      let columnData = dataHolder.map(data => {
        return data.values.find(value => value.column.Name == column.Name).value;
      });

      let data = {
        name: column.Name,
        type: 'line',
        stack: column.Name,
        data: columnData,
        areaStyle: {normal: {}}
      };

      seriesData.push(data);
    });

    this.chartOption = {
      title: {
        text: '堆叠区域图'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data: this.param.Targets.map(column => column.Name)
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
    };
  }

  groupBy(collection, property) {
    var i = 0, val, index,
      values = [], result = [];

    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);

      // if exists
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