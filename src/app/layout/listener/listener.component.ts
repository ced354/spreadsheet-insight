import { Component, OnInit, OnDestroy } from '@angular/core';

import { SpeechService } from '../../shared/services/speech.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.css']
})
export class ListenerComponent implements OnInit, OnDestroy {

  nounSub: Subscription;
  verbSub: Subscription;
  adjSub: Subscription;
  goSub: Subscription;
  errorsSub: Subscription;
  errorMsg: string;

  /**
    * Constructor
  */
  constructor(public svcSpeech: SpeechService){

  }

  ngOnInit() {
    this.svcSpeech.init();
    this._listenNouns();
    this._listenVerbs();
    this._listenAdj();
    this._listenErrors();
  }

  startListening(){
    this.svcSpeech.startListening();
    //var msg = new SpeechSynthesisUtterance("hello world");

          // various settings
          //var voices = window.speechSynthesis.getVoices();
          //msg.voice = voices[10]; // Note: some voices don't support altering params
          //msg.voiceURI = 'native';
          //msg.volume = 1; // 0 to 1
          //msg.rate = 1; // 0.1 to 10
          //msg.pitch = 2; //0 to 2
          //msg.text = 'Hello World';
          //msg.lang = 'en-US';
          //        
          //msg.onend = function(e) {
          //  console.log('Finished in ' + event.elapsedTime + ' seconds.');
          //};

          // check all voices avaialble
          //speechSynthesis.getVoices().forEach(function(voice) {
          //  console.log(voice.name, voice.default ? voice.default :'');
          //});

          // selection of voice
          // msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Whisper'; })[0];

          //(<any>window).speechSynthesis.speak(msg);
  }

  private _listenNouns() {
    this.nounSub = this.svcSpeech.command$
      .filter(obj => obj.type === 'noun')
      .map(nounObj => nounObj.word)
      .subscribe(
        noun => {
          this._setError();
          console.log('noun:', noun);
        }
      );
  }

  private _listenVerbs() {
    this.verbSub = this.svcSpeech.command$
      .filter(obj => obj.type === 'verb')
      .map(verbObj => verbObj.word)
      .subscribe(
        verb => {
          this._setError();
          console.log('verb:', verb);
        }
      );
  }

  private _listenAdj() {
    this.adjSub = this.svcSpeech.command$
      .filter(obj => obj.type === 'adj')
      .map(adjObj => adjObj.word)
      .subscribe(
        adj => {
          this._setError();
          console.log('adjective:', adj);
        }
      );
  }

  

  private _listenErrors() {
    this.errorsSub = this.svcSpeech.errors$
      .subscribe(err => this._setError(err));
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }

  ngOnDestroy() {
    this.nounSub.unsubscribe();
    this.verbSub.unsubscribe();
    this.adjSub.unsubscribe();
    this.goSub.unsubscribe();
    this.errorsSub.unsubscribe();
  }

}