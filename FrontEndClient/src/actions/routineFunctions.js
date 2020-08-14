import axios from 'axios';
let serverAddress = 'http://ec2-13-57-36-23.us-west-1.compute.amazonaws.com:9000'

export const retRoutinePosts = (routine_ID) => async dispatch => {
    try{
        dispatch({type: 'GET_ROUTINE_POSTS_START'})
        let url = `${serverAddress}/getPosts?parentRoutine=${routine_ID}`
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

export const createPost = (uid, title, desc, routine_ID) => async dispatch => {
    console.log("here")
}

export const checkRoutineCompletion = (uid, routine_ID) => async dispatch => {
    try{
        // dispatch({type: 'GET_ROUTINE_POSTS_START'})
        let url = `${serverAddress}/checkCompletion?uid=${uid}&routineID=${routine_ID}`
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

export const joinRoutine = (uid, routineID) => async dispatch => {
    try{
        // dispatch({type: 'GET_ROUTINE_POSTS_START'})
        let url = `${serverAddress}/joinRoutine?uid=${uid}&routineid=${routineID}`
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

export const leaveRoutine = (uid, routineID) => async dispatch => {
    try{
        // dispatch({type: 'GET_ROUTINE_POSTS_START'})
        let url = `${serverAddress}/leaveRoutine?uid=${uid}&routineid=${routineID}`
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

// export const checkUserInRoutine = (uid) => async dispatch => {
//     try{
//         // dispatch({type: 'GET_ROUTINE_POSTS_START'})
//         let url = `${serverAddress}/getUserRoutines?uid=${uid}`
//         const response = await axios.get(url)
//         console.log('check user ', response)
//         // dispatch({type: 'GET_ROUTINE_POSTS_SUCCESS', payload: response.data})
//     }
//     catch(err)
//     {
//         // dispatch({type: 'GET_ROUTINE_POSTS_FAILURE'})
//         console.log(err)

//     }
// }


export const postComment = (uid, message, postId) => async dispatch => {
    try{
        let url = `${serverAddress}/createComment?uid=${uid}&content=${message}&parentPost=${postId}`
        const response = await axios.get(url)
        console.log(response)
        // dispatch({type: 'GET_ROUTINE_POSTS_SUCCESS', payload: response.data})
    }
    catch(err)
    {
        console.log(err)

    }
}


// export const completeRoutine = (uid, routine_ID) => async dispatch => {
//     try{
//         // dispatch({type: 'GET_ROUTINE_POSTS_START'})
//         let url = `${serverAddress}/getPosts?uid=${uid}&routineID=${routine_ID}`
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