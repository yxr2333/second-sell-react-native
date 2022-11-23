import { OperItem } from '../types';

export default function useOperItems(
  setIsVisible: (flag: boolean) => void,
): OperItem[] {
  const list: OperItem[] = [
    {
      title: '个人资料',
      icon: {
        name: 'profile',
        type: 'antdesign',
      },
      viewName: 'PersonalInfo',
    },
    {
      title: '地址管理',
      icon: {
        name: 'address-book-o',
        type: 'font-awesome',
      },
      viewName: 'AddressControl',
    },
    {
      title: '账号与安全',
      icon: {
        name: 'account',
        type: 'material-community',
      },
      viewName: 'SecureDetail',
    },
    {
      title: '退出登录',
      icon: {
        name: 'logout',
        type: 'materialicons',
        color: '#fff',
      },
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      viewName: 'logout',
    },
    {
      title: '取消',
      titleStyle: { color: 'black', fontSize: 20 },
      contentStyle: { display: 'flex', alignItems: 'center' },
      onPress: () => setIsVisible(false),
    },
  ];
  return list;
}
