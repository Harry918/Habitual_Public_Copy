const initalState = {
    results: []
}

export default function searchReducers(state=initalState, action) {
    switch(action.type){
        case 'GET_SEARCH_ROUTINES':
            return{...state, results: action.payload}
        default:
            return{...state}
    }

}