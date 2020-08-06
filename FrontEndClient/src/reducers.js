const initalState = {
    loading: false,
    routines: [],
    images: [],
    update: false
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
            return{...state, loading: false, update: !state.update}
        case 'ROUTINE_POSTS_FAILURE':
            return {...state, loading: false}
        case 'PUBLIC_PIC_SUCCESS':
            return {...state, images: action.payload}
        default: 
            return{...state}
    }

}
export default PublicReducers