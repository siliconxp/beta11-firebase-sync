import { Injectable } from '@angular/core';
import { Effect, StateUpdates } from '@ngrx/effects';
import { AppState } from '../reducers';
import { AppFirebaseActions } from '../actions';

@Injectable()
export class AppFirebaseEffects {
    constructor(
        private updates$: StateUpdates<AppState>,
        private appFirebaseActions: AppFirebaseActions
    ) { }

    @Effect() firebaseConnect$ = this.updates$
        .whenAction(AppFirebaseActions.FIREBASE_CONNECT)
        .do(x => {
            console.log('Effect:firebaseConnect$:A', x);
        })
        .map(() => this.appFirebaseActions.firebaseConnectSuccess());
    // Terminate effect.
    // .ignoreElements();

    @Effect() firebaseSync$ = this.updates$
        .whenAction(AppFirebaseActions.FIREBASE_SYNC)
        .map(x => x.state.appFirebase.offlineActions)
        .concatMap(offlineActions => {
            let actions = [...offlineActions];
            actions.push(this.appFirebaseActions.firebaseSyncSuccess());
            return actions;
        });
}
