// src/app/speech.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

// TypeScript declaration for annyang
declare var annyang: any;

@Injectable()
export class SpeechService {
  command$ = new Subject<{[key: string]: any}>();
  errors$ = new Subject<{[key: string]: any}>();
  listening = false;

  constructor(private zone: NgZone) {}

  get speechSupported(): boolean {
    return !!annyang;
  }

  init() {

    // type : 1-common, 2-data, 3-analyze, 4-dash
    const commands = {
      'noun :noun': (noun) => {
        this.zone.run(() => {
          this.command$.next({type: 'noun', 'word': noun});
        });
      },
      'verb :verb': (verb) => {
        this.zone.run(() => {
          this.command$.next({type: 'verb', 'word': verb});
        });
      },
      'adjective :adj': (adj) => {
        this.zone.run(() => {
          this.command$.next({type: 'adj', 'word': adj});
        });
      },
      'go *tag': (tag) => {
        this.command$.next({type: 1, 'param': tag});
      }
    };
    annyang.addCommands(commands);

    // Log anything the user says and what speech recognition thinks it might be
    // annyang.addCallback('result', (userSaid) => {
    //   console.log('User may have said:', userSaid);
    // });
    annyang.addCallback('errorNetwork', (err) => {
      this._handleError('network', 'A network error occurred.', err);
    });
    annyang.addCallback('errorPermissionBlocked', (err) => {
      this._handleError('blocked', 'Browser blocked microphone permissions.', err);
    });
    annyang.addCallback('errorPermissionDenied', (err) => {
      this._handleError('denied', 'User denied microphone permissions.', err);
    });
    annyang.addCallback('resultNoMatch', (userSaid) => {
      this._handleError(
        'no match',
        'Spoken command not recognized. Say "noun [word]", "verb [word]", OR "adjective [word]".',
        { results: userSaid });
    });
  }

  private _handleError(error, msg, errObj) {
    this.zone.run(() => {
      this.errors$.next({
        error: error,
        message: msg,
        obj: errObj
      });
    });
  }

  startListening() {
    annyang.start();
    this.listening = true;
  }

  abort() {
    annyang.abort();
    this.listening = false;
  }

}