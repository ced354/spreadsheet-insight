import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatTableModule, MatSelectModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatTabsModule, MatPaginatorModule, MatSortModule, MatSnackBarModule, MatListModule } from '@angular/material';

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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
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
    FileUploadModule,
    NgxEchartsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
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
    NgxEchartsModule,
    XlsxFileUploadComponent,
    ChartBasicComponent,
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
