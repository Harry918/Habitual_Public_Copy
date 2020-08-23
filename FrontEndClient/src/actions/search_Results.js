import axios from "axios"

// let serverAddress = 'http://ec2-13-57-36-23.us-west-1.compute.amazonaws.com:9000'
const serverAddress = 'https://habitual.live:9000'


export const getSearchRoutines = (keyword) => async dispatch => {
    console.log(keyword)
    //be our body 
    try{
    let url = `${serverAddress}/searchRoutines?keywords=${keyword}&pageNumber=1&pageLimit=15`
    const response = await axios.get(url)
    dispatch({type: 'GET_SEARCH_ROUTINES', payload: response.data.data})
    }
    catch(err){
        console.log(err)
        //dispatch an erorr
    }
}