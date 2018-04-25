import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IWorksheet } from '../../models/workbook';
import * as $ from 'jquery';
import { ForceDirectedParam } from '../../models/force-directed-param';
import { TREE_ACTIONS } from 'angular-tree-component';

@Component({
  selector: 'container-force-directed',
  templateUrl: './container-force-directed.component.html',
  styleUrls: ['./container-force-directed.component.css']
})

export class ContainerForceDirectedComponent implements OnChanges {
  
  @Input() workSheet: IWorksheet;

  analysisWorkSheet: IWorksheet;

  param: ForceDirectedParam;

  scale: string;


  nodes = [];
  options = {
    allowDrag: true,
    allowDrop: (element, { parent, index }) => {
      return parent.data.droppable;
    },
    actionMapping: {
      mouse: {
        drop: (tree, node, $event, {from, to}) => {

          if(from.parent.data.droppable == true){
            tree.moveNode(from, to);
          }
          else{

            if(!to.parent.data.children){
              to.parent.data.children = [{
                name: from.data.name,
                droppable: true,
                parent: {data:{
                  name: from.data.name,
                  droppable: true,
                  children: []
                }}
              }];
            }
            else{
              to.parent.data.children.push({
                name: from.data.name,
                droppable: true,
                parent: {data:{
                  name: from.data.name,
                  droppable: true,
                  children: []
                }}
              });
            }

            to.parent.treeModel.update();
            to.parent.treeModel.expandAll();
          }

          this.param = JSON.parse(JSON.stringify({
            Scale: this.scale,
            Nodes: this.nodes[1]
          }));

        }
      }
    }
  };

  getTreeNodeObj(column): any{
    return {id: 0, name: column};
  }

  constructor(){

    this.scale = 'none';
  }

  ngOnChanges(changes: SimpleChanges): void {
   
    if(changes.workSheet && changes.workSheet.currentValue != null){
      this.analysisWorkSheet = this.workSheet;

      this.nodes = [
        {
          id: 1,
          name: 'Available Columns',
          droppable: false,
          children: this.analysisWorkSheet.Headers.map(column => { return {droppable: false, name: column};})
        },
        {
          id: 2,
          name: 'Drag and Drop Here',
          droppable: true
        }
      ];

    }

  }

  deleteNode(node) : void {
    if (node.parent != null) {
        node.parent.data.children.splice(node.parent.data.children.indexOf(node.data), 1);
        node.parent.treeModel.update();

        this.param = JSON.parse(JSON.stringify({
          Scale: this.scale,
          Nodes: this.nodes[1]
        }));
    }
  }

  onScaleChanged($event){

    if($event.value){
      this.scale = $event.value;
    }
    else{
      this.scale = 'none';
    }

    this.param = JSON.parse(JSON.stringify({
      Scale: this.scale,
      Nodes: this.nodes[1]
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