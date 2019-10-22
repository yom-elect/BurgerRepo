import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-app-c53fb.firebaseio.com/',

})

export default instance;