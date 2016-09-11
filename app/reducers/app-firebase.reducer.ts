import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppFirebaseActions } from '../actions/app-firebase.action';

import { assign } from '../utils';

export interface AppFirebaseState {
    isConnectingToFirebase: boolean;
    isConnectedToFirebase: boolean;
};

const initialState: AppFirebaseState = {
    isConnectingToFirebase: false,
    isConnectedToFirebase: false
};

export function appFirebaseReducer(
    state = initialState,
    action: Action): AppFirebaseState {

    switch (action.type) {
        default: {
            return state;
        }

        case AppFirebaseActions.FIREBASE_CONNECT: {
            return assign(state, {
                isConnectingToFirebase: true
            });
        }

        case AppFirebaseActions.FIREBASE_CONNECT_SUCCESS: {
            return assign(state, {
                isConnectingToFirebase: false,
                isConnectedToFirebase: true
            });
        }

        case AppFirebaseActions.FIREBASE_DISCONNECT_SUCCESS: {
            return assign(state, {
                isConnectingToFirebase: false,
                isConnectedToFirebase: false
            });
        }
    }
}

export function getIsConnectingToFirebase() {
    return (state$: Observable<AppFirebaseState>) => state$
        .select(s => s.isConnectingToFirebase);
}

export function getIsConnectedToFirebase() {
    return (state$: Observable<AppFirebaseState>) => state$
        .select(s => s.isConnectedToFirebase);
}
