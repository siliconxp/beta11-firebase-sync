import { Injectable } from '@angular/core';
import { Effect, StateUpdates } from '@ngrx/effects';
import { AppState } from '../reducers';
import { ToDoActions } from '../actions';

import { TodoDataService } from '../services/todo.data.service';
import { ToDo } from '../models/todo';

@Injectable()
export class ToDoEffects {
  constructor(
    private updates$: StateUpdates<AppState>,
    private todoActions: ToDoActions,
    private todoDataService: TodoDataService
  ) { }

  @Effect() itemCreateFirebase$ = this.updates$
    .whenAction(ToDoActions.ITEM_CREATE)
    .filter(x => x.state.appFirebase.isConnectedToFirebase)
    .map(x => x.action.payload)
    .do(payload => console.log('itemCreateFirebase$:payload>', payload))
    .map(payload => this.todoActions.firebaseCreate(payload));
  // Terminate effect.
  // .ignoreElements();

  @Effect() itemCreateLocal$ = this.updates$
    .whenAction(ToDoActions.ITEM_CREATE)
    .filter(x => !x.state.appFirebase.isConnectedToFirebase)
    .map(x => x.action.payload)
    .do(payload => console.log('itemCreateLocal$:payload>', payload))
    .map(payload => this.todoActions.localCreate(payload));
  // Terminate effect.
  // .ignoreElements();




  @Effect() loadCollection$ = this.updates$
    .whenAction(ToDoActions.FIREBASE_LOAD)
    .do(x => {
      console.log('Effect:loadCollection$:A', x);
      this.todoDataService.syncWithFirebase(x.state.todo);
    })
    //    .filter(x => x.state.login.isAuthenticated)

    // Watch database node and get items.
    .switchMap(x => this.todoDataService
      .getData()
      .takeUntil(this.updates$.whenAction(ToDoActions.FIREBASE_LOAD_CANCEL)))
    .do(x => { console.log('Effect:loadCollection$:B', x); })
    .map((items: ToDo[]) => this.todoActions.FirebaseLoadSuccess(items));
  // Terminate effect.
  // .ignoreElements());  

  /////// connectToFirebaseSuccess is in WRONG place.
  /*
    @Effect() firebaseLoadSuccess$ = this.updates$
      .whenAction(ToDoActions.FIREBASE_LOAD_SUCCESS)
      .map(() => this.loginActions.connectToFirebaseSuccess());
  */



  @Effect() firebaseCreate$ = this.updates$
    .whenAction(ToDoActions.FIREBASE_CREATE)
    .map(x => {
      this.todoDataService.create(
        x.action.payload);
    })
    // Terminate effect.
    .ignoreElements();

  @Effect() firebaseRemove$ = this.updates$
    .whenAction(ToDoActions.FIREBASE_REMOVE)
    .do(x => {
      this.todoDataService.removeItem(
        x.action.payload);
    })
    // Terminate effect.
    .ignoreElements();

  @Effect() firebaseReorderList$ = this.updates$
    .whenAction(ToDoActions.FIREBASE_REORDER_LIST)
    .do(x => {
      this.todoDataService.reorderItemsAndUpdate(
        x.action.payload.indexes,
        x.state.todo.todos);
    })
    // Terminate effect.
    .ignoreElements();

  @Effect() firebaseUpdate$ = this.updates$
    .whenAction(ToDoActions.FIREBASE_UPDATE)
    .map(x => {
      this.todoDataService.update(
        x.action.payload);
    })
    // Terminate effect.
    .ignoreElements();
}

