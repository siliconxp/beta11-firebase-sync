import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Indexes } from '../models/indexes';
import { ToDo } from '../models/todo';

import { AppState } from '../reducers';
import { ToDoActions } from '../actions';
import { TodoSelector} from '../selectors';

import { AppFirebaseService } from '../services/app-firebase.service';

@Injectable()
export class TodoService {
    private connectedToFirebase: boolean = false;

    constructor(
        private appFirebaseService: AppFirebaseService,
        private todoActions: ToDoActions,
        private store: Store<AppState>
    ) {
        appFirebaseService.isConnectedToFirebase()
            .subscribe(isConnectedToFirebase => {
                console.log('TodoService:isConnectedToFirebase>', isConnectedToFirebase);
                this.connectedToFirebase = isConnectedToFirebase;

                if (isConnectedToFirebase) {
                    this.store.dispatch(
                        this.todoActions.firebaseLoad());
                } else {
                    this.store.dispatch(
                        this.todoActions.firebaseLoadCancel()
                    );
                }
            });
    }

    /*
        clearCompletedItems() {
            this.store.dispatch(
                this.todoActions.clearCompleted()
            );
        }
    */
    getData(): Observable<ToDo[]> {
        return this.store.let(TodoSelector.getToDos());
    }

    initialise(): void {
    }

    firebaseLoad() {
        // console.log('connectToFirebase');
        this.store.dispatch(
            this.todoActions.firebaseLoad());
    }

    isLoaded(): Observable<boolean> {
        return this.store.let(TodoSelector.getLoaded());
    }

    isLoading(): Observable<boolean> {
        return this.store.let(TodoSelector.getLoading());
    }

    reorderItems(indexes: Indexes) {
        if (this.connectedToFirebase) {
            this.store.dispatch(
                this.todoActions.firebaseReorderList(indexes));
        } else {
            this.store.dispatch(
                this.todoActions.localReorderList(indexes));
        }
    }

    delete(todo: ToDo) {
        this.store.dispatch(
            this.todoActions.itemDelete(todo.$key));
    }

    save(todo: ToDo) {
        if (todo.$key === '') {
            this.store.dispatch(
                this.todoActions.itemCreate(todo));
        } else {
            this.store.dispatch(
                this.todoActions.itemUpdate(todo));
        }
    }
}
