import { ParamListBase } from '@react-navigation/native';

export interface StackParamList extends ParamListBase {
  Home: {
    name: string;
    id: number;
  };
  App: {
    text: string;
  };
  Profile: {
    name: string;
  };
  GoodsList: {
    title: string;
  };
  GoodsDetails: {
    goodsId: number;
  };
  CartList: {};
  AuthChecker: {
    children: React.ReactNode;
  };
  EditAddressScreen: {
    addressId: number;
    refresh: () => void;
  };
  AddAddressScreen: {
    refresh: () => void;
  };
  SearchDetailScreen: {
    keyword?: string;
  };
  SpikeDetailScreen: {
    spikeId: number;
  };
}

export type IconItem = {
  icon: {
    name: string;
    type: string;
  };
  bg?: any;
  text?: string;
  nameKey?: string;
};

// 底部弹出框的类型
export type OperItem = {
  icon?: {
    name: string;
    type: string;
    color?: string = '#000';
  };
  title: string;
  containerStyle?: any;
  titleStyle?: any;
  contentStyle?: any;
  onPress?: () => void;
  viewName?: string;
};

export type MockGoodsItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  desc?: string;
};

export type MockUserItem = {
  id: number;
  username: string;
  password: string;
  gender: '男' | '女';
};

export type MockCartItem = {
  id: number;
  name: string;
  decription?: string;
  price: number;
  num: number;
  image: string;
};

export type MockUserInfo = {
  id: number;
  username: string;
  token: string;
};
