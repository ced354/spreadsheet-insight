import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';
import { ChartPieParam } from '../../models/chart-pie-param';

@Component({
  selector: 'container-pie',
  templateUrl: './container-pie.component.html',
  styleUrls: ['./container-pie.component.css']
})

export class ContainerPieComponent implements OnChanges {
  
  @Input() workSheet: IWorksheet;

  param: ChartPieParam;

  constructor(){
  }

  ngOnChanges(changes: SimpleChanges): void {
   
    if(changes.workSheet && changes.workSheet.currentValue != null){
      
    }

  }

  source: any;

  /**
   * CHECKS IF ONE ELEMENT LIES BEFORE THE OTHER
  */
  isbefore(a, b) {
    if (a.parentNode == b.parentNode) {
      for (var cur = a; cur; cur = cur.previousSibling) {
        if (cur === b) {
          return true;
        }
      }
    }
    return false;
  }
  /**
 * LIST ITEM DRAP ENTERED
 */
  dragenter($event) {

    let target = $event.currentTarget;


    if(target.parentNode != this.source.parentNode){
      

      let levels = [];
      for(let i = 0; i < this.source.parentNode.children.length; i++){

        let childText = this.source.parentNode.children[i].outerText.replace(/\r?\n|\r/g, '');
        let sourceText = this.source.outerText.replace(/\r?\n|\r/g, '');

        if(sourceText == childText){ continue; }

        levels.push(childText);
      }
      
      this.param = JSON.parse(JSON.stringify({
        Levels: levels,
        Scale: 'none'
      }));
    }

    if (this.isbefore(this.source, target)) {
      target.parentNode.insertBefore(this.source, target); // insert before
    }
    else {
      target.parentNode.insertBefore(this.source, target.nextSibling); //insert after
    }
  }

  /**
  * LIST ITEM DRAG STARTED
  */
  dragstart($event) {
    this.source = $event.currentTarget;
    $event.dataTransfer.effectAllowed = 'move';
  }

  levelDragEnter($event) {
    let target = $event.currentTarget;
    
    if(this.source.parentNode != target){
      target.appendChild(this.source);
    }

    let levels = [];
    for(let i = 0; i < target.children.length; i++){
      let sourceText = target.children[i].outerText.replace(/\r?\n|\r/g, '');
      levels.push(sourceText);
    }
    
    this.param = JSON.parse(JSON.stringify({
      Levels: levels,
      Scale: 'none'
    }));

  }

  onScaleChanged($event){

    if($event.value){
      this.param = JSON.parse(JSON.stringify({
        Levels: this.param.Levels,
        Scale: $event.value
      }));
    }
    else{
      this.param = JSON.parse(JSON.stringify({
        Levels: this.param.Levels,
        Scale: 'none'
      }));
    }
  }

}