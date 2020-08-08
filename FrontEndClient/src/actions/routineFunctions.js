import axios from 'axios';

export const retRoutinePosts = (routine_ID) => async dispatch => {
    try{
        dispatch({type: 'GET_ROUTINE_POSTS_START'})
        let url = `http://localhost:5000/getPosts?parentRoutine=${routine_ID}`
        const response = await axios.get(url)
        console.log(response)
        dispatch({type: 'GET_ROUTINE_POSTS_SUCCESS', payload: response.data})
    }
    catch(err)
    {
        dispatch({type: 'GET_ROUTINE_POSTS_FAILURE'})
        console.log(err)

    }
}

export const createPost = (title, desc, routine_ID) => async dispatch => {
    console.log("here")
}

export const checkRoutineCompletion = (uid, routine_ID) => async dispatch => {
    try{
        // dispatch({type: 'GET_ROUTINE_POSTS_START'})
        let url = `http://localhost:5000/checkCompletion?uid=${uid}&routineID=${routine_ID}`
        const response = await axios.get(url)
        console.log(response)
        // dispatch({type: 'GET_ROUTINE_POSTS_SUCCESS', payload: response.data})
    }
    catch(err)
    {
        // dispatch({type: 'GET_ROUTINE_POSTS_FAILURE'})
        console.log(err)

    }
}


// export const completeRoutine = (uid, routine_ID) => async dispatch => {
//     try{
//         // dispatch({type: 'GET_ROUTINE_POSTS_START'})
//         let url = `http://localhost:5000/getPosts?uid=${uid}&routineID=${routine_ID}`
//         const response = await axios.get(url)
//         console.log(response)
//         // dispatch({type: 'GET_ROUTINE_POSTS_SUCCESS', payload: response.data})
//     }
//     catch(err)
//     {
//         // dispatch({type: 'GET_ROUTINE_POSTS_FAILURE'})
//         console.log(err)

//     }
// }