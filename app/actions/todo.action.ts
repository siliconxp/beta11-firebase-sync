import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Indexes } from '../models/indexes';
import { ToDo } from '../models/todo';

@Injectable()
export class ToDoActions {
  static ITEM_CREATE = '[ToDoActions] Item Create';
  itemCreate(item: ToDo): Action {
    return {
      type: ToDoActions.ITEM_CREATE,
      payload: item
    };
  }

  static ITEM_DELETE = '[ToDoActions] Item Delete';
  itemDelete(itemKey: string): Action {
    return {
      type: ToDoActions.ITEM_DELETE,
      payload: itemKey
    };
  }

  static ITEM_UPDATE = '[ToDoActions] Item Update';
  itemUpdate(item: ToDo): Action {
    return {
      type: ToDoActions.ITEM_UPDATE,
      payload: item
    };
  }



  static FIREBASE_CREATE = '[ToDoActions] Firebase Create';
  firebaseCreate(item: ToDo): Action {
    return {
      type: ToDoActions.FIREBASE_CREATE,
      payload: item
    };
  }

  static FIREBASE_REMOVE = '[ToDoActions] Firebase Remove';
  firebaseRemove(itemKey: string): Action {
    return {
      type: ToDoActions.FIREBASE_REMOVE,
      payload: itemKey
    };
  }

  static FIREBASE_LOAD = '[ToDoActions] Firebase Load';
  firebaseLoad(): Action {
    return {
      type: ToDoActions.FIREBASE_LOAD
    };
  }

  static FIREBASE_LOAD_CANCEL = '[ToDoActions] Firebase Load Cancel';
  firebaseLoadCancel(): Action {
    return {
      type: ToDoActions.FIREBASE_LOAD_CANCEL
    };
  }

  static FIREBASE_LOAD_SUCCESS = '[ToDoActions] Firebase Load Success';
  FirebaseLoadSuccess(items: ToDo[]): Action {
    return {
      type: ToDoActions.FIREBASE_LOAD_SUCCESS,
      payload: items
    };
  }

  static FIREBASE_REORDER_LIST = '[ToDoActions] Firebase Reorder List';
  firebaseReorderList(indexes: Indexes): Action {
    return {
      type: ToDoActions.FIREBASE_REORDER_LIST,
      payload: {
        indexes: indexes
      }
    };
  }

  static FIREBASE_UPDATE = '[ToDoActions] Firebase Update';
  firebaseUpdate(item: ToDo): Action {
    return {
      type: ToDoActions.FIREBASE_UPDATE,
      payload: item
    };
  }

  static LOCAL_CREATE = '[ToDoActions] Local Create';
  localCreate(item: ToDo): Action {
    return {
      type: ToDoActions.LOCAL_CREATE,
      payload: item
    };
  }

  static LOCAL_REMOVE = '[ToDoActions] Local Remove';
  localRemove(itemKey: string): Action {
    return {
      type: ToDoActions.LOCAL_REMOVE,
      payload: itemKey
    };
  }

  static LOCAL_REORDER_LIST = '[ToDoActions] Local Reorder List';
  localReorderList(indexes: Indexes): Action {
    return {
      type: ToDoActions.LOCAL_REORDER_LIST,
      payload: {
        indexes: indexes
      }
    };
  }

  static LOCAL_UPDATE = '[ToDoActions] Local Update';
  localUpdate(item: ToDo): Action {
    return {
      type: ToDoActions.LOCAL_UPDATE,
      payload: item
    };
  }
}
