import axios from 'axios';

export const googleUser = (uid, displayName, email) => async dispatch => {
    try{
        let url = `http://localhost:5000/createUser?uid=${uid}&displayName=${displayName}&email=${email}`
        const response = await axios.get(url)
        dispatch({type: "LOGIN_SUCCESS"})
        console.log(response)
    }
    catch(err)
    {
        console.log(err)
    }

}