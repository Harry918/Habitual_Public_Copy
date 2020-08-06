import axios from 'axios';

export const retRoutinePosts = (routine_ID) => async dispatch => {
    console.log("here")
    try{
        let url = `http://localhost:5000/getPosts?parentRoutine=${routine_ID}`
        const response = await axios.get(url)
        console.log(response)
        dispatch({type: 'PUBLIC_PIC_SUCCESS'})
    }
    catch(err)
    {
        console.log(err)
    }
}