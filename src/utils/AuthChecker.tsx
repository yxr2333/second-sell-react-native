import * as React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../store/userSlice';
import MessageUtil from './message';
const AuthChecker: React.FC<any> = ({ children, navigation }) => {
  const userInfo = useSelector(selectUserInfo);

  return userInfo.token
    ? children
    : (navigation.replace('Login'), MessageUtil('请先登录！'), (<View />));
};
export default AuthChecker;
