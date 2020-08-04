import axios from 'axios';

export const retTest = () => async dispatch => {
    try{
        let url = 'http://localhost:5000/createUser?uid=1111111111&email=222222'
        const response = await axios.get(url)
        console.log(response)
    }
    catch(err)
    {
        console.log(err)
    }
}

export const getPublicRoutines = () => async dispatch => {
    dispatch({type: 'PUBLIC_ROUTINES_START'})
    try{
        let url = 'http://localhost:5000/getPublicRoutines'
        const response = await axios.get(url)
        console.log(response)
        dispatch({type: 'PUBLIC_ROUTINES_SUCCESS', payload: response.data})
    }
    catch(err)
    {
        console.log(err)
        dispatch({type: 'PUBLIC_ROUTINES_FAILURE'})
    }
}




export const getRoutinePosts = () => async dispatch => {
    try{
        dispatch({type: 'ROUTINE_POSTS_START'})
        let url = 'http://localhost:5000/getRoutinePosts'
        const response = await axios.get(url)
        console.log(response)
        dispatch({type: 'ROUTINE_POSTS_SUCCESS', payload: response.data})
    }
    catch(err)
    {
        console.log(err)
        dispatch({type: 'ROUTINE_POSTS_SUCCESS'})
    }
}

export const createRoutine = () => async dispatch => {
    try{
        // dispatch({type: 'ROUTINE_POSTS_START'})
        let url = 'http://localhost:5000/createRoutine?uid=harry&title=wakingup&description=somethingcool&public=true'
        const response = await axios.get(url)
        console.log(response)
        dispatch({type: 'ROUTINE_POSTS_SUCCESS', payload: response.data})
    }
    catch(err)
    {
        console.log(err)
        dispatch({type: 'ROUTINE_POSTS_SUCCESS'})
    }
}
export const getPhoto = (callback) => async dispatch => {
    try{
        // dispatch({type: 'ROUTINE_POSTS_START'})
        let content = {
            responseType: 'blob',
            headers: {'Content-Type': 'multipart/form-data'}
          }
        let url = 'http://localhost:5000/getPhoto'
        const response = await axios.get(url, content)
        console.log(response)
        dispatch({type: 'ROUTINE_POSTS_SUCCESS', payload: response.data})
        if(callback)
        {
            callback(response.data)
        }
    }
    catch(err)
    {
        console.log(err)
        // dispatch({type: 'ROUTINE_POSTS_SUCCESS'})
    }
}
