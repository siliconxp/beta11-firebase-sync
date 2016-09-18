import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class AppFirebaseActions {
    static CREATE_OFFLINE_ACTION = '[AppFirebase] Create Offline Action';
    createOfflineAction(action: Action): Action {
        return {
            type: AppFirebaseActions.CREATE_OFFLINE_ACTION,
            payload: action
        };
    }

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

    static FIREBASE_SYNC = '[AppFirebase] Firebase Sync';
    firebaseSync(): Action {
        return {
            type: AppFirebaseActions.FIREBASE_SYNC
        };
    }

    static FIREBASE_SYNC_SUCCESS = '[AppFirebase] Firebase Sync Success';
    firebaseSyncSuccess(): Action {
        return {
            type: AppFirebaseActions.FIREBASE_SYNC_SUCCESS
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
