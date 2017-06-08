import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertStateInterface, ADDALERT, REMOVEALERT } from '../../reducer/alert.reducer';

interface AppState {
  alert: AlertStateInterface;
}

@Component({
  selector: 'app-alert-messages',
  template: `
    <div class="alert" *ngIf="alertAsync | async as alert">
      <div class="{{alert.messageState}}" *ngIf="alert.message">
        {{alert.message}}
        <span class="close" (click)="remove()">ok</span>
      </div>
    </div>
    <button (click)="show()">Show random message</button>
  `
})
export class AlertComponent {
  alertAsync: Observable<AlertStateInterface>;

  constructor(private store: Store<AppState>) {
    this.alertAsync = store.select('alert');
  }

  show() {
    // randomizer
    const randomNumber = Math.floor((Math.random() * 3) + 1);
    switch (randomNumber) {
      case 1: {
        this.store.dispatch({ type: ADDALERT, payload: {
            'message': 'Howdy',
            'messageState': 'INFO'
          }
        });
        return;
      }
      case 2: {
        this.store.dispatch({ type: ADDALERT, payload: {
          'message': 'GREAT !',
          'messageState': 'SUCCESS'
        }});
        return;
      }
      case 3: {
        this.store.dispatch({ type: ADDALERT, payload: {
          'message': 'BAD',
          'messageState': 'ERROR'
        }});
        return;
      }
      default:
        this.store.dispatch({ type: ADDALERT, payload: {
          'message': 'Howdy',
          'messageState': 'INFO'
        }});
        return;
    }

  }

  remove() {
    this.store.dispatch({ type: REMOVEALERT });
  }

}
