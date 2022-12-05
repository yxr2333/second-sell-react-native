import request from '../utils/request';

export function getAllGoodsType() {
  return request({
    method: 'get',
    url: '/goodsType/getAll',
  });
}

export function randomGetGoods(size: number) {
  return request({
    method: 'get',
    url: '/goods/random',
    params: {
      size,
    },
  });
}
