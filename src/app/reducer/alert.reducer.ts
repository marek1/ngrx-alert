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
  messageState: messageTypes.INFO
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
      return Object.assign({}, state, initalMessageState);
    }
    default: {
      return state;
    }
  }
}
