import { combineReducers } from 'redux';
import dashboardReducers from './dashboardReducers'
import routineReducers from './routineReducers'

const reducers = {
    dashboardReducers,
      routineReducers
}


export default combineReducers(reducers);