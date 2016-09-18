import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Indexes } from '../models/indexes';
import { ToDo } from '../models/todo';

@Injectable()
export class TodoActions {
  static ITEM_CREATE = '[Todo] Item Create';
  itemCreate(item: ToDo): Action {
    return {
      type: TodoActions.ITEM_CREATE,
      payload: item
    };
  }

  static ITEM_DELETE = '[Todo] Item Delete';
  itemDelete(itemKey: string): Action {
    return {
      type: TodoActions.ITEM_DELETE,
      payload: itemKey
    };
  }

  static ITEM_UPDATE = '[Todo] Item Update';
  itemUpdate(item: ToDo): Action {
    return {
      type: TodoActions.ITEM_UPDATE,
      payload: item
    };
  }

  static ITEMS_REORDER = '[Todo] Items reorder';
  itemsReorder(indexes: Indexes): Action {
    return {
      type: TodoActions.ITEMS_REORDER,
      payload: indexes
    };
  }

  static FIREBASE_CREATE = '[Todo] Firebase Create';
  firebaseCreate(item: ToDo): Action {
    return {
      type: TodoActions.FIREBASE_CREATE,
      payload: item
    };
  }

  static FIREBASE_DELETE = '[Todo] Firebase Delete';
  firebaseDelete(itemKey: string): Action {
    return {
      type: TodoActions.FIREBASE_DELETE,
      payload: itemKey
    };
  }

  static FIREBASE_LOAD = '[Todo] Firebase Load';
  firebaseLoad(): Action {
    return {
      type: TodoActions.FIREBASE_LOAD
    };
  }

  static FIREBASE_LOAD_CANCEL = '[Todo] Firebase Load Cancel';
  firebaseLoadCancel(): Action {
    return {
      type: TodoActions.FIREBASE_LOAD_CANCEL
    };
  }

  static FIREBASE_LOAD_SUCCESS = '[Todo] Firebase Load Success';
  FirebaseLoadSuccess(items: ToDo[]): Action {
    return {
      type: TodoActions.FIREBASE_LOAD_SUCCESS,
      payload: items
    };
  }

  static FIREBASE_REORDER_LIST = '[Todo] Firebase Reorder List';
  firebaseReorderList(indexes: Indexes): Action {
    return {
      type: TodoActions.FIREBASE_REORDER_LIST,
      payload: {
        indexes: indexes
      }
    };
  }

  static FIREBASE_UPDATE = '[Todo] Firebase Update';
  firebaseUpdate(item: ToDo): Action {
    return {
      type: TodoActions.FIREBASE_UPDATE,
      payload: item
    };
  }

  static LOCAL_CREATE = '[Todo] Local Create';
  localCreate(item: ToDo): Action {
    return {
      type: TodoActions.LOCAL_CREATE,
      payload: item
    };
  }

  static LOCAL_REMOVE = '[Todo] Local Remove';
  localRemove(itemKey: string): Action {
    return {
      type: TodoActions.LOCAL_REMOVE,
      payload: itemKey
    };
  }

  static LOCAL_REORDER_LIST = '[Todo] Local Reorder List';
  localReorderList(indexes: Indexes): Action {
    return {
      type: TodoActions.LOCAL_REORDER_LIST,
      payload: {
        indexes: indexes
      }
    };
  }

  static LOCAL_UPDATE = '[Todo] Local Update';
  localUpdate(item: ToDo): Action {
    return {
      type: TodoActions.LOCAL_UPDATE,
      payload: item
    };
  }
}
