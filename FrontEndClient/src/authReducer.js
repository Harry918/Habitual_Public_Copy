const initalState = {
    authError: null
}

export default function authReducer(state=initalState, action) {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return{...state, authError: null}
        case 'GET_ROUTINE_POSTS_SUCCESS':
            return{...state, routinePosts: action.payload, loading: false}
        case 'GET_ROUTINE_POSTS_FAILURE':
            return{...state, errorMessage: 'ERROR RETRIEVING POSTS'}
        case 'SIGNOUT_SUCCESS':
            return{...state, authError: true}
            default: 
            return{...state}
    }

}