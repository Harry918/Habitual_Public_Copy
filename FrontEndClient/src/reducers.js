const initalState = {
    loading: false,
    routines: [],
    images: []
}

function PublicReducers(state=initalState, action) {
    switch(action.type){
        case 'PUBLIC_ROUTINES_START':
            return{...state, loading: true}
        case 'PUBLIC_ROUTINES_SUCCESS':
            return{...state, loading: false, routines: action.payload}
        case 'PUBLIC_ROUTINES_FAILURE':
            return {...state, loading: false}
        case 'ROUTINE_POSTS_START':
            return{...state, loading: true}
        case 'ROUTINE_POSTS_SUCCESS':
            return{...state, loading: false, routines: action.payload}
        case 'ROUTINE_POSTS_FAILURE':
            return {...state, loading: false}
        case 'GET_PIC_SUCCESS':
            return {...state, images: action.payload}
        default: 
            return{...state}
    }

}
export default PublicReducers