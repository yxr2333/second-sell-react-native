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

export function getGoodsDetailById(goodsId: number) {
  return request({
    method: 'get',
    url: '/goods/detail',
    params: {
      gid: goodsId,
    },
  });
}
/**
 * 通过类型编号查询其对应的所有商品
 * @param typeId 类型编号
 * @returns 商品列表
 */
export function getGoodsListByTypeId(
  typeId: number,
  page: number = 1,
  size: number = 10,
) {
  return request({
    method: 'get',
    url: '/goods/byType',
    params: {
      typeId,
      page,
      size,
    },
  });
}
