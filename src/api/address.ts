import {
  AddAddressParam,
  UpdateAddressParam,
} from '../types/request/developRequest';
import request from '../utils/request';

export function findAddressByUserId(userId: number) {
  return request({
    method: 'get',
    url: '/address/user',
    params: {
      userId,
    },
  });
}

export function createAddress(data: AddAddressParam) {
  return request({
    method: 'post',
    url: '/address',
    data,
  });
}

export function updateAddress(data: UpdateAddressParam) {
  return request({
    method: 'put',
    url: '/address',
    data,
  });
}

export function findAddressById(id: number) {
  return request({
    method: 'get',
    url: `/address/find/${id}`,
  });
}

export function deleteAddressById(addressId: number) {
  return request({
    method: 'delete',
    url: '/address',
    params: {
      addressId,
    },
  });
}
