import { combineReducers } from 'redux';
import dashboardReducers from './dashboardReducers'
import routineReducers from './routineReducers'
import searchReducers from './searchReducers'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const reducers = {
    dashboardReducers,
      routineReducers,
      firestore: firestoreReducer,
      firebase: firebaseReducer,
      searchReducers

}


export default combineReducers(reducers);