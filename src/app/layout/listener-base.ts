
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { SpeechService } from '../shared/services/speech.service';

export class ListenerBase implements OnDestroy {

  commonSubs: Subscription;
  errorsSub: Subscription;
  errorMsg: string;

  /**
    * Constructor
  */
  constructor(public svcSpeech: SpeechService){
    this._listenErrors();
  }

  ngOnDestroy() {
    this.commonSubs.unsubscribe();
    this.errorsSub.unsubscribe();
  }

  private _listenErrors() {
    this.errorsSub = this.svcSpeech.errors$
      .subscribe(err => this._setError(err));
  }

  protected _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }

}