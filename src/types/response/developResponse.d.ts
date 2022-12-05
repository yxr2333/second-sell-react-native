export type ApiResult<T> = {
  code: number;
  msg?: string;
  data?: T;
};

export type UserLoginResponse = {
  tokenInfo: TokenInfo;
  baseInfo: UserBaseInfo;
};

export type TokenInfo = {
  token: string;
  name: string;
};

export type UserBaseInfo = {
  id: number;
  username: string;
  description?: string;
  email?: string;
  avatar?: string;
  token?: string;
};

export type GoodsTypeBaseInfo = {
  id: number;
  name: string;
  typeLevel: number;
};

export type GoodsSimpleInfo = {
  id: number;
  name: string;
  description: string;
  cover: string;
};
export type SpikeInfo = {
  id: number;
  sid: string;
  name: string;
  startDate: string;
  endDate: string;
};
export type AddressInfo = {
  id: number;
  address: string;
  name: string;
  phone: string;
};

export type UserLoginResult = ApiResult<UserLoginResponse>;
export type GetAllGoodsTypeResult = ApiResult<GoodsTypeBaseInfo[]>;
export type GetRandomGoodsResult = ApiResult<GoodsSimpleInfo[]>;
export type GetRecentSpikeResult = ApiResult<SpikeInfo[]>;
export type GetAddressByUserIdResult = ApiResult<AddressInfo[]>;
export type GetAddressByIdResult = ApiResult<AddressInfo>;
