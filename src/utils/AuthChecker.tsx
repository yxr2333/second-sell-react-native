import * as React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../store/userSlice';
import MessageUtil from './message';
const AuthChecker = ({
  children,
  navigation,
}: {
  children: JSX.Element;
  navigation: any;
}) => {
  const userInfo = useSelector(selectUserInfo);
  React.useEffect(() => {
    if (!userInfo.token) {
      MessageUtil('请先登录');
      navigation.replace('Login');
    }
  });

  return userInfo.token ? children : <View />;
};
export default AuthChecker;
