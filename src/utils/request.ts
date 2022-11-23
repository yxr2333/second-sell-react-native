import axios from 'axios';

const request = axios.create({
  baseURL: 'http://10.148.17.52:7080/sell',
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
