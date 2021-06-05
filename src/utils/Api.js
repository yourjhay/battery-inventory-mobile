import axios from 'axios';


axios.defaults.baseURL = 'http://192.168.3.50:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const apiKey = 'carlopogi'


//LOG IN
export const loginUser = async (data) => await axios.post('/login', data).then(response => response.data);

export const dashboardData = async () => await axios.get('/dashboard').then(response => response.data);

export const productsData = async () => await axios.get('/products').then(response => response.data);

export const supplierData = async () => await axios.get('/supplier').then(response => response.data);
