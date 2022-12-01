import axios from 'axios';

export const baseURL = 'http://10.148.17.52:7080/sell';
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
