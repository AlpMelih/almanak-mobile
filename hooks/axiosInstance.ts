import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://sea-lion-app-fp5y4.ondigitalocean.app/',
    timeout: 10000,
});

/* const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
});
 */

export default apiClient;
