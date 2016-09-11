import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';

// import { AppState, FivebookItemState, getFivebookItems, getLoaded, getLoading } from '../reducers';
import * as A from '../reducers';

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * Once again our compose function comes in handy. From right to left, we
 * first select the books state then we pass the state to the book
 * reducer's getBooks selector, finally returning an observable
 * of search results.
 */
export function getToDoState() {
  return (state$: Observable<A.AppState>) => state$
    .select(s => s.todo);
}


export function getLoaded() {
  return compose(A.getLoaded(), getToDoState());
}

export function getLoading() {
  return compose(A.getLoading(), getToDoState());
}

export function getToDos() {
  return compose(A.getTodos(), getToDoState());
}
