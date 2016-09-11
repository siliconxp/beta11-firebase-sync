import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class AppFirebaseActions {
    static FIREBASE_CONNECT = '[AppFirebase] Firebase Connect';
    firebaseConnect(): Action {
        return {
            type: AppFirebaseActions.FIREBASE_CONNECT
        };
    }

    static FIREBASE_CONNECT_SUCCESS = '[AppFirebase] Firebase Connect Success';
    firebaseConnectSuccess(): Action {
        return {
            type: AppFirebaseActions.FIREBASE_CONNECT_SUCCESS
        };
    }

    static FIREBASE_DISCONNECT_SUCCESS = '[AppFirebase] Firebase Disconnect Success';
    firebaseDisconnectSuccess(): Action {
        return {
            type: AppFirebaseActions.FIREBASE_DISCONNECT_SUCCESS
        };
    }
}

/*
Requires Typescript 2

import { label } from '../utils';

export const Types = {
    FIREBASE_CONNECT: label('[AppFirebase] Firebase Connect'),
    FIREBASE_CONNECT_SUCCESS: label('[AppFirebase] Firebase Connect Success')
};

export class FirebaseConnect implements Action {
    type = Types.FIREBASE_CONNECT;

    constructor() { }
}

export class FirebaseConnectSuccess implements Action {
    type = Types.FIREBASE_CONNECT_SUCCESS;

    constructor() { }
}
/==
export class Search implements Action {
  type = Types.SEARCH;

  constructor(public payload: string) { }
}
==/
export type All =
    FirebaseConnect
  | FirebaseConnectSuccess
*/
