import axios from 'axios';

export const baseURL = 'http://192.168.2.11:7080/sell';
const request = axios.create({
  baseURL,
  timeout: 5000,
});
request.interceptors.request.use(req => {
  console.log('request', req);
  return req;
});

request.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response);
  }
});

export default request;
