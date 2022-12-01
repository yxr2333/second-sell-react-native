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

export type UserLoginResult = ApiResult<UserLoginResponse>;
export type GetAllGoodsTypeResult = ApiResult<GoodsTypeBaseInfo[]>;
