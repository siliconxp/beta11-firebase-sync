import { Injectable } from '@angular/core';
import { Effect, StateUpdates } from '@ngrx/effects';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';

import { AppFirebaseActions } from '../actions';
import { TodoActions } from '../actions';

import { TodoDataService } from '../services/todo.data.service';
import { ToDo } from '../models/todo';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { assign } from '../utils';

@Injectable()
export class ToDoEffects {
  constructor(
    private appFirebaseActions: AppFirebaseActions,
    private updates$: StateUpdates<AppState>,
    private todoActions: TodoActions,
    private todoDataService: TodoDataService,
    private store: Store<AppState>
  ) { }
  /*
          switch (item.type) {
            case ToDoActions.LOCAL_UPDATE:
              {
                console.log('ToDoActions.LOCAL_UPDATE');
                actions.push(this.todoActions.firebaseUpdate(item.payload));
              }
          }
  */
  @Effect() offline$ = this.updates$
    .whenAction(
    TodoActions.LOCAL_CREATE,
    TodoActions.LOCAL_UPDATE
    )
    .map(x => x.action)
    .do(action => console.log('offline$:action>', action))
    .map(action => {
      let firebaseAction;

      // Convert to firebase actions.
      switch (action.type) {
        case TodoActions.LOCAL_CREATE:
          {
            console.log('ToDoActions.LOCAL_CREATE');
            firebaseAction = this.todoActions.firebaseCreate(action.payload);
            break;
          }

        case TodoActions.LOCAL_UPDATE:
          {
            console.log('ToDoActions.LOCAL_UPDATE');
            firebaseAction = this.todoActions.firebaseUpdate(action.payload);
            break;
          }
      }
      return this.appFirebaseActions.createOfflineAction(firebaseAction);
    });


  /*
    @Effect() offline$ = this.updates$
      .whenAction(
      ToDoActions.LOCAL_CREATE,
      ToDoActions.LOCAL_UPDATE
      )
      .map(x => x.action)
      .do(action => console.log('offline$:action>', action))
      .map(action => this.appFirebaseActions.createOfflineAction(action));
    // Terminate effect.
    // .ignoreElements();
  */

  /* working
    @Effect() firebaseConnectSuccess$ = this.updates$
      .whenAction(AppFirebaseActions.FIREBASE_CONNECT_SUCCESS)
      .mergeMap(() => Observable.concat(
        Observable.of(this.todoActions.firebaseSync()),
        Observable.of(this.todoActions.firebaseLoad())
        ));
  */
  /* also works
    @Effect() firebaseConnectSuccess$ = this.updates$
      .whenAction(AppFirebaseActions.FIREBASE_CONNECT_SUCCESS)
      .mergeMap(() => {
        let a = [];
        a.push(this.todoActions.firebaseSync());
        a.push(this.todoActions.firebaseLoad());
        return a;
      });
  */
  /*  
    @Effect() firebaseConnectSuccess$ = this.updates$
      .whenAction(AppFirebaseActions.FIREBASE_CONNECT_SUCCESS)
      .concatMap(() => {
        let a = [];
        a.push(this.appFirebaseActions.firebaseSync());
        a.push(this.todoActions.firebaseLoad());
        return a;
      });
  */

  // AppFirebaseActions - start
  @Effect() firebaseDisconnectSuccess$ = this.updates$
    .whenAction(AppFirebaseActions.FIREBASE_DISCONNECT_SUCCESS)
    .map(() => this.todoActions.firebaseLoadCancel());

  @Effect() firebaseConnectSuccess$ = this.updates$
    .whenAction(AppFirebaseActions.FIREBASE_SYNC_SUCCESS)
    .map(() => this.todoActions.firebaseLoad());
  // AppFirebaseActions - end

  @Effect() itemCreateFirebase$ = this.updates$
    .whenAction(TodoActions.ITEM_CREATE)
    .filter(x => x.state.appFirebase.isConnectedToFirebase)
    .map(x => x.action.payload)
    .do(payload => console.log('itemCreateFirebase$:payload>', payload))
    .map(payload => this.todoActions.firebaseCreate(payload));
  // Terminate effect.
  // .ignoreElements();

  @Effect() itemCreateLocal$ = this.updates$
    .whenAction(TodoActions.ITEM_CREATE)
    .filter(x => !x.state.appFirebase.isConnectedToFirebase)
    .map(x => x.action.payload)
    .do(payload => console.log('itemCreateLocal$:payload>', payload))
    .map(payload => this.todoActions.localCreate(payload));
  // Terminate effect.
  // .ignoreElements();

  @Effect() itemDeleteFirebase$ = this.updates$
    .whenAction(TodoActions.ITEM_DELETE)
    .filter(x => x.state.appFirebase.isConnectedToFirebase)
    .map(x => x.action.payload)
    .do(payload => console.log('itemDeleteFirebase$:payload>', payload))
    .map(payload => this.todoActions.firebaseRemove(payload));
  // Terminate effect.
  // .ignoreElements();

  @Effect() itemDeleteLocal$ = this.updates$
    .whenAction(TodoActions.ITEM_DELETE)
    .filter(x => !x.state.appFirebase.isConnectedToFirebase)
    .map(x => x.action.payload)
    .do(payload => console.log('itemDeleteLocal$:payload>', payload))
    .map(payload => this.todoActions.localRemove(payload));
  // Terminate effect.
  // .ignoreElements()

  @Effect() itemsReorderFirebase$ = this.updates$
    .whenAction(TodoActions.ITEMS_REORDER)
    .filter(x => x.state.appFirebase.isConnectedToFirebase)
    .map(x => x.action.payload)
    .do(payload => console.log('itemsReorderFirebase$:payload>', payload))
    .map(payload => this.todoActions.firebaseReorderList(payload));
  // Terminate effect.
  // .ignoreElements();

  @Effect() itemsReorderLocal$ = this.updates$
    .whenAction(TodoActions.ITEMS_REORDER)
    .filter(x => !x.state.appFirebase.isConnectedToFirebase)
    .map(x => x.action.payload)
    .do(payload => console.log('itemsReorderLocal$:payload>', payload))
    .map(payload => this.todoActions.localReorderList(payload));
  // Terminate effect.
  // .ignoreElements();




  @Effect() itemUpdateFirebase$ = this.updates$
    .whenAction(TodoActions.ITEM_UPDATE)
    .filter(x => x.state.appFirebase.isConnectedToFirebase)
    .map(x => x.action.payload)
    .do(payload => console.log('itemUpdateFirebase$:payload>', payload))
    .map(payload => this.todoActions.firebaseUpdate(payload));
  // Terminate effect.
  // .ignoreElements();

  @Effect() itemUpdateLocal$ = this.updates$
    .whenAction(TodoActions.ITEM_UPDATE)
    .filter(x => !x.state.appFirebase.isConnectedToFirebase)
    .map(x => x.action.payload)
    .do(payload => console.log('itemUpdateLocal$:payload>', payload))
    .map(payload => this.todoActions.localUpdate(payload));
  // Terminate effect.
  // .ignoreElements();




  @Effect() loadCollection$ = this.updates$
    .whenAction(TodoActions.FIREBASE_LOAD)
    .do(x => {
      console.log('Effect:loadCollection$:A', x);
      // this.todoDataService.syncWithFirebase(x.state.todo);

      /*      
            let actions: Action[] = [];
      
            x.state.appFirebase.offlineActions.map(item => {
              switch (item.type) {
                case ToDoActions.LOCAL_UPDATE:
                  {
                    console.log('ToDoActions.LOCAL_UPDATE');
                    this.store.dispatch(
                      this.todoActions.firebaseUpdate(item.payload));
                  }
              }
            });
      
            return actions;
      */
    })

    // Watch database node and get items.
    .switchMap(x => this.todoDataService
      .getData()
      .takeUntil(this.updates$.whenAction(TodoActions.FIREBASE_LOAD_CANCEL)))
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
    .whenAction(TodoActions.FIREBASE_CREATE)
    .map(x => {
      this.todoDataService.create(
        x.action.payload);
    })
    // Terminate effect.
    .ignoreElements();

  @Effect() firebaseRemove$ = this.updates$
    .whenAction(TodoActions.FIREBASE_REMOVE)
    .do(x => {
      this.todoDataService.removeItem(
        x.action.payload);
    })
    // Terminate effect.
    .ignoreElements();

  @Effect() firebaseReorderList$ = this.updates$
    .whenAction(TodoActions.FIREBASE_REORDER_LIST)
    .do(x => {
      this.todoDataService.reorderItemsAndUpdate(
        x.action.payload.indexes,
        x.state.todo.todos);
    })
    // Terminate effect.
    .ignoreElements();

  @Effect() firebaseUpdate$ = this.updates$
    .whenAction(TodoActions.FIREBASE_UPDATE)
    .map(x => {
      this.todoDataService.update(
        x.action.payload);
    })
    // Terminate effect.
    .ignoreElements();
}

