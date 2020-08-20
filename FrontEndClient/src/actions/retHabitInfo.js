import axios from 'axios';
// let serverAddress = 'https://ec2-52-53-232-246.us-west-1.compute.amazonaws.com:9000'
let serverAddress = 'http://localhost:9000'

export const retTest = () => async dispatch => {
    try{
        let url = '/createUser?uid=1111111111&email=222222'
        const response = await axios.get(url)
    }
    catch(err)
    {
        console.log(err)
    }
}

async function retPic(response, callback) {
    let imagesArray = []
    let temp
    for(let i in response.data.result){
        const options = {
            responseType: 'blob',
            headers: {'Content-Type': 'multipart/form-data'}
          }
        let url2 = `${serverAddress}/getPhoto?key=${response.data.result[i].picturekey}`
        const response2 = await axios.get(url2, options)
        convertPic(callback, response2, imagesArray, response.data.result.length, (callback, data, imagesArray, arraySize) => {
            imagesArray.push(data)
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

export const getPublicRoutines = (pageNumber, callback) => async dispatch => {
    console.log(pageNumber)
    dispatch({type: 'PUBLIC_ROUTINES_START'})
    try{
        console.log(pageNumber)
        let url = `${serverAddress}/getPublicRoutines/?pageNumber=${pageNumber}&pageLimit=5`
        const response = await axios.get(url)
        .then(async (response) => {
            if(response.data.result.length < 10){
                dispatch({type: 'END_RET_FOR_ROUTINES'})
            }
            let images = []
            dispatch({type: 'PUBLIC_ROUTINES_SUCCESS', payload: response.data})
            // retPic(response, (imagesArray) => {
            //     dispatch({type: 'PUBLIC_PIC_SUCCESS', payload: imagesArray})
            // })
        })
        if(callback){
            callback()
        }
    }
    catch(err)
    {
        console.log(err)
        dispatch({type: 'PUBLIC_ROUTINES_FAILURE'})
    }
}


export const createRoutine = (uid,title, desc, pub, file, callback) => async dispatch => {
    console.log("here")
    console.log(file)
    const   options = {
        headers: {'Content-Type': 'multipart/form-data'}
    }
    try{
        dispatch({type: 'ROUTINE_POSTS_START'})
        let url = `${serverAddress}/uploadImg`
        axios.post(url, file, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
              console.log(response)
            // dispatch({type: 'ROUTINE_POSTS_SUCCESS', payload: {title: title, description: desc, public: pub}})
              console.log('title, des, pub, ', title, desc, pub)
                 let url = `${serverAddress}/createRoutine?uid=${uid}&title=${title}&description=${desc}&public=true&picturekey=${response.data.key}`
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

export const createRoutineWithoutImage = (uid, title, desc, pub) => async dispatch => {
    let url = `${serverAddress}/createRoutine?uid=${uid}&title=${title}&description=${desc}&public=true&picturekey=''`
    try{
       const response = await axios.get(url)
       console.log(response)
    }
    catch(err){
        console.log(err)
    }
}

export const getUsersRoutines = (uid, callback) => async dispatch => {
    console.log(uid)
    try{
        let url = `${serverAddress}/getUserRoutines/?uid=${uid}`
        const response = await axios.get(url)
        console.log(response)
        dispatch({type: 'GET_USERS_ROUTINES', payload: response.data})
        if(callback){
            callback(response.data)
        }
    }
    catch(err)
    {
        console.log(err)
    }
}