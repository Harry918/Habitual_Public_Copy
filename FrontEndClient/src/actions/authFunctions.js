import axios from 'axios';
let serverAddress = 'http://ec2-52-53-149-51.us-west-1.compute.amazonaws.com:9000'

export const googleUser = (uid, displayName, email) => async dispatch => {
    try{
        let url = `${serverAddress}/createUser?uid=${uid}&displayName=${displayName}&email=${email}`
        const response = await axios.get(url)
        dispatch({type: "LOGIN_SUCCESS"})
        console.log(response)
    }
    catch(err)
    {
        console.log(err)
    }

}