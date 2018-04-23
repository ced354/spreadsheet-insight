import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';
import { ForceDirectedParam } from '../../models/force-directed-param';

@Component({
  selector: 'container-force-directed',
  templateUrl: './container-force-directed.component.html',
  styleUrls: ['./container-force-directed.component.css']
})

export class ContainerForceDirectedComponent implements OnChanges {
  
  @Input() workSheet: IWorksheet;

  param: ForceDirectedParam;

  scale: string;

  focus: string;

  constructor(){

    this.scale = 'none';
    this.focus = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
   
    if(changes.workSheet && changes.workSheet.currentValue != null){
      
    }

  }

  onFocusChanged($event): void {

    this.param = JSON.parse(JSON.stringify({
      Levels: this.param.Levels,
      Scale: this.scale,
      Focus: $event
    }));
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
        Scale: this.scale,
        Focus: this.focus
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
      Scale: this.scale,
      Focus: this.focus
    }));

  }

  onScaleChanged($event){

    if($event.value){
      this.scale = $event.value;
    }
    else{
      this.scale = 'none';
    }

    this.param = JSON.parse(JSON.stringify({
      Levels: this.param.Levels,
      Scale: this.scale,
      Focus: this.focus
    }));
  }

}