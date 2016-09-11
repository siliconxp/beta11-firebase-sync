import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from './pages/home/home.page';

import { provideStore }from '@ngrx/store';
import { runEffects } from '@ngrx/effects';
import actions from './actions';
import effects from './effects';
import reducers from './reducers';

import { AppFirebaseService } from './services/app-firebase.service';
import { TodoDataService } from './services/todo.data.service';
import { TodoService } from './services/todo.service';

import {
  defaultFirebase,
  FIREBASE_PROVIDERS,
} from 'angularfire2';

import { MyFirebaseAppConfig } from './my-firebase-app-config';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

import { Subscription } from 'rxjs/Subscription';
import { database } from 'firebase';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any }>;

  effectsSubscription: Subscription;

  constructor(
    private appFirebaseService: AppFirebaseService,
    public platform: Platform
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Todos', component: HomePage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    console.log('#### initializeApp>');
    let connectedRef = database().ref('.info/connected');
    connectedRef.on('value', snap => {
      let isOnline: boolean = snap.val();

      console.log('isOnline>', isOnline);

      if (isOnline) {
         this.appFirebaseService.connectToFirebase();
      } else {
        this.appFirebaseService.disconnectFromFirebase();
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [
  AppFirebaseService,
  TodoDataService,
  TodoService,
  /**
   * provideStore is run once at application bootstrap, accepting a reducer
   * function or object map of reducer functions. If passed an object of
   * reducers, combineReducers will be run creating your application
   * meta-reducer. This returns all providers for an @ngrx/store
   * based application.
   *
   * Source: https://github.com/ngrx/store/blob/master/src/ng2.ts#L43-L69
   */
  provideStore(reducers),

  /**
   * runEffects configures all providers for @ngrx/effects. Observables decorated
   * as an @Effect() within the supplied services will ultimately be merged,
   * with output of relevant (registered as effects) actions being
   * dispatched into your application store. Any side-effects in
   * your application should be registered as effects.
   *
   * Source: https://github.com/ngrx/effects/blob/master/lib/run-effects.ts#L8-L20
   */
  runEffects(effects),

  /**
   * Finally we provide additional services and action creators so they can
   * be used by all of our components, effects, and guards.
   */
  // services,
  actions,
  // guards,  
  FIREBASE_PROVIDERS,

  // Initialize Firebase app  
  defaultFirebase(MyFirebaseAppConfig.config)
]);
