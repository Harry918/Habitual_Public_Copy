const initalState = {
    loading: false,
    routinePosts: [],
    errorMessage: '',
    completedRoutine: false,
    live_feed: [],
    numCompletions: 0,
    active: 0
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
        default: 
            return{...state}
    }

}