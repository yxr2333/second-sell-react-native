import { UserLoginParam } from '../types/request/developRequest';
import request from '../utils/request';

export function doLogin(data: UserLoginParam) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
}
