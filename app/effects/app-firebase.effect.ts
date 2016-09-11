import { Injectable } from '@angular/core';
import { Effect, StateUpdates } from '@ngrx/effects';
import { AppState } from '../reducers';
import { AppFirebaseActions } from '../actions';
import { AppFirebaseService } from '../services/app-firebase.service';
import { TodoDataService } from '../services/todo.data.service';
import { TodoService } from '../services/todo.service';

@Injectable()
export class AppFirebaseEffects {
    constructor(
        private updates$: StateUpdates<AppState>,
        private actions: AppFirebaseActions,
        private service: AppFirebaseService,
        // private todoActions: ToDoActions,
        private todoDataService: TodoDataService,
        private todoService: TodoService
    ) { }

    @Effect() firebaseConnect$ = this.updates$
        .whenAction(AppFirebaseActions.FIREBASE_CONNECT)
        .do(x => {
            console.log('Effect:firebaseConnect$:A', x);
            // this.todoDataService.syncWithFirebase(x.state.todo);
            this.service.connectToFirebaseSuccess();
        })
        //    .filter(x => x.state.login.isAuthenticated)

        // Watch database node and get items.
        // .switchMap(x => this.todoDataService.getData())
        // .do(x => { console.log('Effect:loadCollection$:B', x); })
        // .map((items: ToDo[]) => this.todoActions.FirebaseLoadSuccess(items));
        // Terminate effect.
        .ignoreElements();

/*
    @Effect() firebaseConnectSuccess$ = this.updates$
        .whenAction(AppFirebaseActions.FIREBASE_CONNECT_SUCCESS)
        .do(x => {
            console.log('Effect:firebaseConnectSuccess$:A', x);
            // this.todoDataService.syncWithFirebase(x.state.todo);
        })
        //    .filter(x => x.state.login.isAuthenticated)

        // Watch database node and get items.
        // .switchMap(x => this.todoDataService.getData())
        // .do(x => { console.log('Effect:loadCollection$:B', x); })
        // .map((items: ToDo[]) => this.todoActions.FirebaseLoadSuccess(items));
        // Terminate effect.
        .ignoreElements();
*/        
}
