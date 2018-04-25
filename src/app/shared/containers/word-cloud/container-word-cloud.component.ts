import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';
import { WordCloudParam } from '../../models/word-cloud-param';

@Component({
  selector: 'container-word-cloud',
  templateUrl: './container-word-cloud.component.html',
  styleUrls: ['./container-word-cloud.component.css']
})

export class ContainerWordCloudComponent implements OnChanges {
  
  @Input() workSheet: IWorksheet;

  analysisWorkSheet: IWorksheet;

  param: WordCloudParam;

  scale: string;

  constructor(){

    this.scale = 'none';
  }

  ngOnChanges(changes: SimpleChanges): void {
   
    if(changes.workSheet && changes.workSheet.currentValue != null){
      this.analysisWorkSheet = this.workSheet;
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
      

      let columns = [];
      for(let i = 0; i < this.source.parentNode.children.length; i++){

        let childText = this.source.parentNode.children[i].outerText.replace(/\r?\n|\r/g, '');
        let sourceText = this.source.outerText.replace(/\r?\n|\r/g, '');

        if(sourceText == childText){ continue; }

        columns.push(childText);
      }
      
      this.param = JSON.parse(JSON.stringify({
        Columns: columns,
        Scale: this.scale
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

    let columns = [];
    for(let i = 0; i < target.children.length; i++){
      let sourceText = target.children[i].outerText.replace(/\r?\n|\r/g, '');
      columns.push(sourceText);
    }
    
    this.param = JSON.parse(JSON.stringify({
      Columns: columns,
      Scale: this.scale
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
      Columns: this.param.Columns,
      Scale: this.scale
    }));
  }

  onDataChanged($event) {
    this.analysisWorkSheet = JSON.parse(JSON.stringify({
      Name: this.workSheet.Name,
      Headers:this.workSheet.Headers,
      Values: $event
    }));
  }

}