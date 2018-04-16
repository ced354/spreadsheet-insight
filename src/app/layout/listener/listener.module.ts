import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ListenerComponent } from './listener.component';

@NgModule({
  declarations: [
    ListenerComponent
  ],
  imports: [
    FormsModule,
    HttpModule
  ],
  providers: []
})
export class ListenerModule { }