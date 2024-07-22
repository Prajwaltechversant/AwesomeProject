import axios from "axios"


export const userAPI = async () => {

    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    console.log('====================================');
    console.log(response);
    console.log('====================================');

    return response.data;
}