import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppSharedModule } from './shared/app-shared.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { ListenerComponent } from './layout/listener/listener.component';
import { AnalysisComponent } from './layout/analysis/analysis.component';

import { SpeechService } from './shared/services/speech.service';

import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ListenerComponent,
    AnalysisComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppSharedModule
  ],
  providers: [
    SpeechService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
