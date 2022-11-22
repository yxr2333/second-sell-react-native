import axios from 'axios';

const request = axios.create({
  baseURL: 'http://10.134.244.29:5000',
  timeout: 50000,
});

request.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response);
  }
});

export default request;
