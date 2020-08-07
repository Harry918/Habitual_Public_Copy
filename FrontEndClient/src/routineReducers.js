const initalState = {
    loading: false,
    routinePosts: [],
    errorMessage: ''
}

export default function routineReducers(state=initalState, action) {
    switch(action.type){
        case 'GET_ROUTINE_POSTS_START':
            return{...state, loading: true}
        case 'GET_ROUTINE_POSTS_SUCCESS':
            return{...state, routinePosts: action.payload, loading: false}
        case 'GET_ROUTINE_POSTS_FAILURE':
            return{...state, errorMessage: 'ERROR RETRIEVING POSTS'}
        default: 
            return{...state}
    }

}