import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AppFirebaseSelector } from '../selectors';
import { AppFirebaseActions } from '../actions';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AppFirebaseService {
    constructor(
        private af: AngularFire,
        private actions: AppFirebaseActions,
        private store: Store<AppState>
    ) { }

    connectToFirebase() {
        this.store.dispatch(
            this.actions.firebaseConnect());
    }

    connectToFirebaseSuccess() {
        this.store.dispatch(
            this.actions.firebaseConnectSuccess());
    }

    disconnectFromFirebase() {
        this.store.dispatch(
            this.actions.firebaseDisconnectSuccess());
    }

    isConnectedToFirebase(): Observable<boolean> {
        return this.store.let(AppFirebaseSelector.getConnectedToFirebase());
    }
}
