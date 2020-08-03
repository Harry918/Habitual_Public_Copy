import axios from 'axios';
export const retTest = () => async dispatch => {
    try{
        // axios({
        //     method: 'GET',
        //     url: 'http://localhost:5000/createUser',
        //     data: {
        //       firstName: 'Finn',
        //       lastName: 'Williams'
        //     }
        //   })
        //   .then((response) => {
        //       console.log(response)
        //   })


        let url = 'http://localhost:5000/createUser?uid=1249126784&email=tpzhu@gmail.com'
        const response = await axios.get(url)
        console.log(response)

    }
    catch(err)
    {
        console.log(err)
    }
}