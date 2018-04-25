import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TreeModule } from 'angular-tree-component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatTableModule, MatSelectModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatTabsModule, MatPaginatorModule, MatSortModule, MatSnackBarModule, MatListModule, MatSliderModule } from '@angular/material';

import { XlsxFileUploadComponent } from './components/xlsx-file-upload/xlsx-file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';

import { NgxEchartsModule } from 'ngx-echarts';

import { ChartBasicComponent } from './components/chart-basic/chart-basic.component';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { ForceDirectedComponent } from './components/force-directed/force-directed.component';
import { ChartPieComponent } from './components/chart-pie/chart-pie.component';
import { AnalysisDataComponent } from './components/analysis-data/analysis-data.component';
import { CommonModule } from '@angular/common';
import { ContainerPieComponent } from './containers/chart-pie/container-pie.component';
import { ContainerForceDirectedComponent } from './containers/force-directed/container-force-directed.component';
import { ContainerWordCloudComponent } from './containers/word-cloud/container-word-cloud.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TreeModule,
    FlexLayoutModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatListModule,
    MatSliderModule,
    FileUploadModule,
    NgxEchartsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TreeModule,
    FlexLayoutModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatListModule,
    MatSliderModule,
    NgxEchartsModule,
    XlsxFileUploadComponent,
    ChartBasicComponent,
    ContainerWordCloudComponent,
    WordCloudComponent,
    ContainerForceDirectedComponent,
    ForceDirectedComponent,
    ContainerPieComponent,
    ChartPieComponent,
    AnalysisDataComponent
  ],
  declarations: [
    XlsxFileUploadComponent,
    ChartBasicComponent,
    ContainerWordCloudComponent,
    WordCloudComponent,
    ContainerForceDirectedComponent,
    ForceDirectedComponent,
    ContainerPieComponent,
    ChartPieComponent,
    AnalysisDataComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppSharedModule { }
