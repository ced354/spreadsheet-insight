import { Component } from '@angular/core';
import { SpeechService } from '../shared/services/speech.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  /**
    * Constructor
  */
  constructor(public svcSpeech: SpeechService){
    
  }

}