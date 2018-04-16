import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatTableModule, MatSelectModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatTabsModule, MatPaginatorModule, MatSortModule } from '@angular/material';

import { XlsxFileUploadComponent } from './components/xlsx-file-upload/xlsx-file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';

import { NgxEchartsModule } from 'ngx-echarts';

import { ChartBasicComponent } from './components/chart-basic/chart-basic.component';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { ForceDirectedComponent } from './components/force-directed/force-directed.component';

@NgModule({
  imports: [
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
    FileUploadModule,
    NgxEchartsModule
  ],
  exports: [
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
    NgxEchartsModule,
    XlsxFileUploadComponent,
    ChartBasicComponent,
    WordCloudComponent,
    ForceDirectedComponent
  ],
  declarations: [
    XlsxFileUploadComponent,
    ChartBasicComponent,
    WordCloudComponent,
    ForceDirectedComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppSharedModule { }
