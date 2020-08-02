import axios from 'axios';
export const retTest = () => async dispatch => {
    try{
        let url = 'http://localhost:5000/createUser'
        let send = {
            uid: '2312',
            email: "test@gmail.com"
        }
        // const response = await axios.get(url, send)
        // console.log(response)

        }
        catch(err)
        {
            console.log(err)
        }
    }