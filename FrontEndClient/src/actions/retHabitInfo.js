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

async function retPic(id, callback) {
    let imagesArray = []
    const options = {
        responseType: 'blob',
        headers: {'Content-Type': 'multipart/form-data'}
      }
    let url2 = `http://localhost:5000/getPhoto?key=${id}`
    const response2 = await axios.get(url2, options)
    const url = window.URL.createObjectURL(new Blob([response2.data]))
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(response2.data);
    fileReaderInstance.onloadend = () => {
      const base64data = fileReaderInstance.result;
      if(callback)
      {
          callback(base64data)
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
            for(i in response.data){
                 await retPic(response.data[i].picturekey, (data) => {
                    images.push(data)
                    console.log(images)
                    dispatch({type: 'GET_PIC_SUCCESS', payload: images})
                })
            }

            // images = response.data.map(async id => {
            //     const data = await retPic(id)
            //     console.log(data)
            //     images.push(data)
            // })
            // console.log(images)
            // for (i in response.data){
            //     let url2 = `http://localhost:5000/getPhoto?key=${response.data[i].picturekey}`
            //     const response2 = await axios.get(url2, options)
            //     var base64data
            //     const url = window.URL.createObjectURL(new Blob([response2.data]))
            //     const fileReaderInstance = new FileReader();
            //     fileReaderInstance.readAsDataURL(response2.data);
            //     fileReaderInstance.onloadend = () => {
            //       const base64data = fileReaderInstance.result;
            //       images.push(base64data)
            //       console.log(images.length)
            //     }
            // }
                console.log(images)
        })
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

export const createRoutine = (title, desc, pub, file, callback) => async dispatch => {
    const options = {
        headers: {'Content-Type': 'multipart/form-data'}
    }
    try{
        // dispatch({type: 'ROUTINE_POSTS_START'})
        let url = 'http://localhost:5000/uploadImg'
        axios.post(url, file, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
              console.log('title, des, pub, ', title, desc, pub)
                 let url = `http://localhost:5000/createRoutine?uid=100&title=${title}&description=${desc}&public=true&picturekey=${response.data.key}`
              //let url = `http://localhost:5000/createRoutine?uid=100&title=test&description=testdesciprtion&public=true&picturekey=picturekey`
              axios.get(url)
              .then(response => {
                console.log(response)
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
