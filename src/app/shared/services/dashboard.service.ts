// src/app/speech.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ChartParam } from '../models/chart-param';

@Injectable()
export class DashboardService {
  
  private mChartParams = new BehaviorSubject<ChartParam[]>([]);
  navItem$ = this.mChartParams.asObservable();

  constructor() {}

  // temp
  setCharts(iJsonString: string): void {
    localStorage.setItem('dash', iJsonString);
  }

  // temp
  getCharts(): ChartParam[]{
    
    if(!localStorage.getItem('dash')){
      return null;
    }

    let param = localStorage.getItem('dash');
    return JSON.parse(param);
  }

}