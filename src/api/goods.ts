import request from '../utils/request';

export function getAllGoodsType() {
  return request({
    method: 'get',
    url: '/goodsType/getAll',
  });
}