State Management in Angular2: Using ngrx-store to manage state

Where should an application keep the state ?

 - Components? Not ideal, at least once you have shared logic (state) between components. 
 - Services? It is one way, as you inject the ones necessary into a component and subscribe to its Subject(s) or
   BehaviourSubject(s).

Better than services: using a library that manages state (i.e. ngrx-store).

Having your Angular2 (or 4) application setup, just install ngrx-store (https://github.com/ngrx/store)

    npm install @ngrx/core @ngrx/store --save

An easy example for its usage could be a component, which displays alert messages. First we will need a reducer, that handles the different "actions".

    // reducer/alert.reducer.ts
    import {ActionReducer, Action} from '@ngrx/store';
    
    export enum messageTypes {
      SUCCESS,
      ERROR,
      INFO
    }
    
    export interface AlertStateInterface {
      message: string;
      messageState: messageTypes | string;
    }
    
    export const initalMessageState: AlertStateInterface = {
      message: '',
      messageState: ''
    };
    
    export const ADDALERT = 'ADDALERT';
    export const REMOVEALERT = 'REMOVEALERT';
    
    export function alertReducer(state: AlertStateInterface = initalMessageState, action: Action) {
      switch (action.type) {
        case ADDALERT: {
          return Object.assign({}, state, {
            message: action.payload.message,
            messageState: action.payload.messageState
          });
        }
        case REMOVEALERT: {
          return Object.assign({}, state, {
            message: '',
            messageState: ''
          });
        }
        default: {
          return state;
        }
      }
    }
    
There are 2 types of actions (ADDALERT and REMOVEALERT) which the reducer can receive. An action has 2 properties : type and payload. There is a switch case for each type, which returns a new state. The payload can be defined as needed, in our case it has 2 properties : message and messageState (which can either INFO, SUCCESS or ERROR).

The actions can be dispatched anywhere in the application by calling : 

    store.dispatch({ type: XXXXX, payload: { // });
    
Lets say we want to dispatch an error (alert) in a component. First we need to inject store, and then dispatch the action.

     constructor(private store: Store<AppState>) {
	   // dispatch an error
	    this.store.dispatch({ type: ADDALERT, payload: {
          'message': 'BAD',
          'messageState': 'ERROR'
        }});
	 }

An alert component is then needed, which listens to state changes in the store. Since we do not want component state, we simply create an observable and update the view using the async pipe.

    @Component({
      selector: 'app-alert-messages',
      template: `
        <div class="alert" *ngIf="alertAsync | async as alert">
          <div class="{{alert.messageState}}" *ngIf="alert.message">
            {{alert.message}}
          </div>
        </div>
      `
    })
    export class AlertComponent {
      alertAsync: Observable<AlertStateInterface>;
    
      constructor(private store: Store<AppState>) {
        this.alertAsync = store.select('alert');
      }
    }


Managing state employing ngrx-store means having stateless (!) components and services. 

"Everything is a stream".

You can find the implementation on my github : .....

