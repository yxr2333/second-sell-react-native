export type UserLoginParam = {
  username: string;
  password: string;
};

export type AddAddressParam = {
  userId: number;
  name: string;
  phone: string;
  address: string;
};

export type UpdateAddressParam = {
  id: number;
  name: string;
  phone: string;
  address: string;
};

export type UpdateUserLoginPasswordParam = {
  userId: number;
  oldPassword: string;
  newPassword: string;
  requestKey: string;
  code: string;
};

export type UpdateUserBaseInfoParam = {
  id: number;
  username: string;
  description: string;
  avatar: string;
};
