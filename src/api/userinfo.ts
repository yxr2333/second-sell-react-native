import request from '../utils/request';

/**
 * 查询用户发布的商品列表
 * @param userId 用户编号
 * @returns 商品列表
 */
export function findUserPublishGoods(userId: number) {
  return request({
    url: '/userinfo/goods',
    method: 'get',
    params: {
      id: userId,
    },
  });
}
/**
 * 查询用户卖出的商品列表
 * @param userId 用户编号
 * @returns 商品列表
 */
export function findUserSellGoods(userId: number) {
  return request({
    url: '/userinfo/goods/sell',
    method: 'get',
    params: {
      userId,
    },
  });
}

export function findUserBuyGoods(userId: number) {
  return request({
    url: '/userinfo/goods/buy',
    method: 'get',
    params: {
      userId,
    },
  });
}
