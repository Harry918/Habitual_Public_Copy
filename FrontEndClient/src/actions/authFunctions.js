import axios from 'axios';
// let serverAddress = 'http://ec2-52-53-149-51.us-west-1.compute.amazonaws.com:9000'
const serverAddress = 'https://habitual.live:9000'


export const googleUser = (uid, displayName, email) => async dispatch => {
    try{
        let url = `${serverAddress}/createUser?uid=${uid}&displayName=${displayName}&email=${email}`
        const response = await axios.get(url)
        localStorage.setItem("uid", uid)
        localStorage.setItem("displayName", displayName)
        dispatch({type: 'ADD_USER_CRED', payload: {displayName: displayName, uid: uid}})
        console.log(response)
    }
    catch(err)
    {
        console.log(err)
    }

}

export const createUser = (uid, email, displayName, callback) => async dispatch => {
    try {
        let url = `${serverAddress}/createUser?uid=${uid}&displayName=${displayName}&email=${email}`
        const response = await axios.get(url)
        localStorage.setItem("uid", uid)
        localStorage.setItem("displayName", displayName)
        dispatch({type: 'ADD_USER_CRED', payload: {displayName: displayName, uid: uid}})
        console.log(response)
        if(callback){
            callback()
        }
    }
    catch(err) {
        console.log(err)
    }
}

export const loginUser = (user, pass, firebase, callback) => async dispatch => {
    console.log(user, pass)

    
    try{
        const response = await firebase.auth().signInWithEmailAndPassword(user, pass)
        console.log(response.user.uid)
        const url = `${serverAddress}/getDisplayName?uid=${response.user.uid}`
        const response2 = await axios.get(url)
        console.log(response2.data.displayName, response.user.uid)
        localStorage.setItem("uid", response.user.uid)
        localStorage.setItem("displayName", response2.data.displayName)
        dispatch({type: 'ADD_USER_CRED', payload: {displayName: response2.data.displayName, uid: response.user.uid}})
        if(callback){
            callback()
        }
    }
    catch(err){
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        
        alert("Invalid Login. Please try again.")
      }
}