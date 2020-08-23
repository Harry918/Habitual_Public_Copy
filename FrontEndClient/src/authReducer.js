const initalState = {
    displayName: '', 
    uid: ''
}

export default function authReducer(state=initalState, action) {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return{...state, authError: null}
        case 'SIGNOUT_SUCCESS':
            return{...state, authError: true}
        case 'ADD_USER_CRED':
            console.log(action.payload.uid, action.payload.displayName)
            return{...state, uid: action.payload.uid, displayName: action.payload.displayName}
        default: 
            return{...state}
    }

}