import {
  UpdateUserBaseInfoParam,
  UpdateUserLoginPasswordParam,
  UserLoginParam,
} from '../types/request/developRequest';
import request from '../utils/request';

export function doLogin(data: UserLoginParam) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
}

export function updateLoginPassword(data: UpdateUserLoginPasswordParam) {
  return request({
    url: '/userinfo/password',
    method: 'put',
    data,
  });
}

export function updateUserBaseInfo(data: UpdateUserBaseInfoParam) {
  return request({
    url: '/userinfo/basic',
    method: 'put',
    data,
  });
}
