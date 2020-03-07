import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://knowledge-base-c9097.firebaseio.com'
});

export default instance;