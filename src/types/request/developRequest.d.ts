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
