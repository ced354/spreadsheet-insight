import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AnalysisComponent } from './analysis.component';

@NgModule({
  declarations: [
    AnalysisComponent
  ],
  imports: [
    FormsModule,
    HttpModule
  ],
  providers: []
})
export class AnalysisModule { }