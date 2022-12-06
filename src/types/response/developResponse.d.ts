export type ApiResult<T> = {
  code: number;
  msg?: string;
  data?: T;
};

export type UserLoginResponse = {
  tokenInfo: TokenInfo;
  baseInfo: UserBaseInfo;
};

/**
 * token信息
 */
export type TokenInfo = {
  token: string;
  name: string;
};

/**
 * 用户登录后保存的基本信息
 */
export type UserBaseInfo = {
  id: number;
  username: string;
  description?: string;
  email?: string;
  avatar?: string;
  token?: string;
  phone?: string;
};
/**
 * 商品类别基本信息
 */
export type GoodsTypeBaseInfo = {
  id: number;
  name: string;
  typeLevel: number;
};
/**
 * 商品简单信息
 */
export type GoodsSimpleInfo = {
  id: number;
  name: string;
  description: string;
  cover: string;
};
/**
 * 秒杀信息
 */
export type SpikeInfo = {
  id: number;
  sid: string;
  name: string;
  startDate: string;
  endDate: string;
};

/**
 * 地址信息
 */
export type AddressInfo = {
  id: number;
  address: string;
  name: string;
  phone: string;
};

/**
 * 发送验证码的回调信息
 */
export type SendCodeEmailInfo = {
  verifyCode: string;
  requestKey: string;
};
/**
 * 用户基本信息
 */
export type UserEntityBaseInfo = {
  id: number;
  username: string;
  description?: string;
  email?: string;
  avatar?: string;
  phone?: string;
};

/**
 * 分页数据的格式
 */
export type PageData<T> = {
  totalNum: number;
  totalPage: number;
  data: T;
};

/**
 * 商品信息
 */
export type Goods = {
  id: number;
  name: string;
  description: string;
  price: number;
  brand: string;
  type: GoodsTypeBaseInfo;
  freeTotal: number;
  cover: string;
  releaseUser: UserEntityBaseInfo;
  isDiscount: boolean;
  discountPercent: number;
  isDown: boolean;
  isDeleted: boolean;
  releaseTime: string;
};

export type UserLoginResult = ApiResult<UserLoginResponse>;
export type GetAllGoodsTypeResult = ApiResult<GoodsTypeBaseInfo[]>;
export type GetRandomGoodsResult = ApiResult<GoodsSimpleInfo[]>;
export type GetRecentSpikeResult = ApiResult<SpikeInfo[]>;
export type GetAddressByUserIdResult = ApiResult<AddressInfo[]>;
export type GetAddressByIdResult = ApiResult<AddressInfo>;
export type SendCodeByEmailResult = ApiResult<SendCodeEmailInfo>;
export type GetGoodsDetailResult = ApiResult<Goods>;
export type GetGoodsByTypeResult = ApiResult<PageData<Goods[]>>;
