import request from './../utils/request';

export function hello() {
  return request({
    method: 'get',
    url: '/',
  });
}
