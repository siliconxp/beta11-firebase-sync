import { Injectable } from '@angular/core';
import { Effect, StateUpdates } from '@ngrx/effects';
import { AppState } from '../reducers';
import { AppFirebaseActions } from '../actions';

@Injectable()
export class AppFirebaseEffects {
    constructor(
        private updates$: StateUpdates<AppState>,
        private actions: AppFirebaseActions
    ) { }

    @Effect() firebaseConnect$ = this.updates$
        .whenAction(AppFirebaseActions.FIREBASE_CONNECT)
        .do(x => {
            console.log('Effect:firebaseConnect$:A', x);
        })
        .map(() => this.actions.firebaseConnectSuccess());
        // Terminate effect.
        // .ignoreElements();
}
