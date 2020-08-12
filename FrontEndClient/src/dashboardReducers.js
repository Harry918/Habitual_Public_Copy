const initalState = {
    loading: false,
    publicRoutines: [],
    images: [],
    update: false,
    userRoutines: [],
    pageNumber: 1,
    lastPage: false
}

export default function dashboardReducers(state=initalState, action) {
    switch(action.type){
        case 'PUBLIC_ROUTINES_START':
            return{...state, loading: true}
        case 'PUBLIC_ROUTINES_SUCCESS':
            console.log(state.pageNumber)
            return{...state, loading: false, publicRoutines: [...state.publicRoutines, ...action.payload.result], pageNumber: state.pageNumber+ 1 }
        case 'PUBLIC_ROUTINES_FAILURE':
            return {...state, loading: false}
        case 'ROUTINE_POSTS_START':
            return{...state, loading: true}
        case 'ROUTINE_POSTS_SUCCESS':
            return{...state, loading: false, update: !state.update}
        case 'ROUTINE_POSTS_FAILURE':
            return {...state, loading: false}
        case 'PUBLIC_PIC_SUCCESS':
            return {...state, images: [...state.images, ...action.payload]}
        case 'GET_USERS_ROUTINES':
            return {...state, userRoutines: action.payload}
        default: 
            return{...state}
    }

}