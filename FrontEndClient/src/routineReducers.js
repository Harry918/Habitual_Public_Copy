const initalState = {
    loading: false,
    routinePosts: [],
    errorMessage: '',
    completedRoutine: false,
    live_feed: [],
    numCompletions: 0,
    active: 0,
    routineID: '',
    update: false
}

export default function routineReducers(state=initalState, action) {
    switch(action.type){
        case 'GET_ROUTINE_POSTS_START':
            return{...state, loading: true}
        case 'GET_ROUTINE_POSTS_SUCCESS':
            return{...state, routinePosts: action.payload, loading: false}
        case 'GET_ROUTINE_POSTS_FAILURE':
            return{...state, errorMessage: 'ERROR RETRIEVING POSTS'}
        case 'SET_LIVE_MESSAGES':
            return{...state, live_feed: action.payload.messages, numCompletions: action.payload.numCompletions, active: action.payload.active}
        case 'SET_LIVE_UPDATE':
            return{...state, live_feed: action.payload.messages, numCompletions: action.payload.numCompletions}
        case 'SET_ACTIVE_PEOPLE':
            return{...state, active: action.payload}
        case 'SET_ROUTINE_ID_TEMP':
            return{...state, routineID: action.payload}
        case 'UPDATE_COMMENTS':
            return{...state, update: !state.update}
        default: 
            return{...state}
    }

}