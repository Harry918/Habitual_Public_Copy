import axios from 'axios';
let serverlink = 'http://localhost:5000'
//let serverlink = 'http://dbe991ca5bf7.ngrok.io'

export const retTest = () => async dispatch => {
    try{
        let url = '/createUser?uid=1111111111&email=222222'
        const response = await axios.get(url)
        console.log(response)
    }
    catch(err)
    {
        console.log(err)
    }
}

async function retPic(response, callback) {
    let imagesArray = []
    let temp
    for(let i in response.data){
        const options = {
            responseType: 'blob',
            headers: {'Content-Type': 'multipart/form-data'}
          }
        let url2 = `${serverlink}/getPhoto?key=${response.data[i].picturekey}`
        console.log(response.data.length)
        const response2 = await axios.get(url2, options)
        convertPic(callback, response2, imagesArray, response.data.length, (callback, data, imagesArray, arraySize) => {
            imagesArray.push(data)
            console.log("here2")
            if(imagesArray.length === arraySize){
                // dispatch({type: 'PUBLIC_PIC_SUCCESS', payload: imagesArray})
                if(callback)
                {
                    callback(imagesArray)
                }
                }
})
    }
}

function convertPic(callback1, res, imagesArray, arraySize, callback){
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(res.data);
    let data = fileReaderInstance.onloadend = () => {
      const base64data = fileReaderInstance.result;
      if(callback)
        {
            callback(callback1, base64data, imagesArray, arraySize)
        }      
    return base64data 
}
}

export const getPublicRoutines = () => async dispatch => {
    let i
    dispatch({type: 'PUBLIC_ROUTINES_START'})
    try{
        let url = 'http://localhost:5000/getPublicRoutines'
        const response = await axios.get(url)
        .then(async (response) => {
            let images = []
            dispatch({type: 'PUBLIC_ROUTINES_SUCCESS', payload: response.data})
            retPic(response, (imagesArray) => {
                dispatch({type: 'PUBLIC_PIC_SUCCESS', payload: imagesArray})
            })
        })
    }
    catch(err)
    {
        console.log(err)
        dispatch({type: 'PUBLIC_ROUTINES_FAILURE'})
    }
}




export const getRoutinePosts = () => async dispatch => {
//     try{
//         dispatch({type: 'ROUTINE_POSTS_START'})
//         let url = 'http://localhost:5000/getRoutinePosts'
//         const response = await axios.get(url)
//         console.log(response)
//         dispatch({type: 'ROUTINE_POSTS_SUCCESS', payload: response.data})
//     }
//     catch(err)
//     {
//         console.log(err)
//         dispatch({type: 'ROUTINE_POSTS_SUCCESS'})
//     }
}

export const createRoutine = (title, desc, pub, file, callback) => async dispatch => {
    const options = {
        headers: {'Content-Type': 'multipart/form-data'}
    }
    try{
        dispatch({type: 'ROUTINE_POSTS_START'})
        let url = 'http://localhost:5000/uploadImg'
        axios.post(url, file, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
              console.log(response)
            // dispatch({type: 'ROUTINE_POSTS_SUCCESS', payload: {title: title, description: desc, public: pub}})
              console.log('title, des, pub, ', title, desc, pub)
                 let url = `http://localhost:5000/createRoutine?uid=100&title=${title}&description=${desc}&public=true&picturekey=${response.data.key}`
              axios.get(url)
              .then(response => {
                console.log(response)
                dispatch({type: 'ROUTINE_POSTS_SUCCESS'})
              })
            .catch(error => {
                console.log(error)
            })
              
    })
    .catch(error => {
        console.log(error)
    })}
    catch(err)
    {
        console.log(err)
        dispatch({type: 'ROUTINE_POSTS_FAILURE'})
    }
}

export const joinRoutine = () => async dispatch => {
    //uid routineID
    try{
        // dispatch({type: 'ROUTINE_POSTS_START'})
        let url = 'http://localhost:5000/joinRoutine?uid=7ffgf&routineid=1000'
        const response = await axios.get(url)
        console.log(response)
        dispatch({type: 'ROUTINE_POSTS_SUCCESS', payload: response.data})
    }
    catch(err)
    {
        console.log(err)
        // dispatch({type: 'ROUTINE_POSTS_SUCCESS'})
    }
}
