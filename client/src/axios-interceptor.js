import axios from 'axios';

const axiosConfig = {};

axios.interceptors.request.use((request) => {
    if (localStorage.getItem('jwtToken')) {
        request.headers.set('Authorization', `Bearer ${localStorage.getItem('jwtToken')}`);
    }

    return request;
});

export default axiosConfig;
