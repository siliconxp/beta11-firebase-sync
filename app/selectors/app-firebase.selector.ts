import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';

import { AppState } from '../reducers';
import  * as appFirebaseReducer from '../reducers/app-firebase.reducer';

export function getAppFirebseState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.appFirebase);
}

export function getConnectedToFirebase() {
  return compose(appFirebaseReducer.getIsConnectedToFirebase(), getAppFirebseState());
}

