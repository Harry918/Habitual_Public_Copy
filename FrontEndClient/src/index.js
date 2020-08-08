import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import combineReducers from './combineReducers.js'
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase'
import {reduxFirestore, getFirestore} from 'redux-firestore'
import app from './base.js'
import firebase from 'firebase/app'

// const rrfProps = {
//   firebase,
//   config: fbConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance
// };

const store = createStore(
  combineReducers,
  compose(
      applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
      reduxFirestore(firebase, app)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
