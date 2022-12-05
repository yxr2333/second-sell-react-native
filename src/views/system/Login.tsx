import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Image, Input, Text } from '@rneui/themed';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../api/user';
import { login } from '../../store/userSlice';
import { UserLoginResult } from '../../types/response/developResponse';

const Login: React.FC<NativeStackScreenProps<any, any>> = ({ navigation }) => {
  const [username, setUsername] = React.useState('icecream');
  const [password, setPassword] = React.useState('yu020506');
  const [title, setTitle] = React.useState('登录');
  const dispatch = useDispatch();
  const goRegister = () => {
    navigation.setOptions({
      title: '注册',
    });
    setTitle('注册');
  };
  const handleLogin = () => {
    let toast: any = null;
    let param = { username, password };
    doLogin(param).then(resp => {
      if (resp) {
        console.log(resp);
        //@ts-ignore
        const { code, data, msg } = resp as UserLoginResult;
        if (code === 200) {
          toast = Toast.show('登录成功', {
            duration: 1000,
            animation: true,
            shadow: true,
            hideOnPress: true,
            delay: 0,
            position: Toast.positions.CENTER,
          });
          const userInfo = {
            ...data?.baseInfo,
            token: data?.tokenInfo.token,
          };
          dispatch(login(userInfo));
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
        } else {
          toast = Toast.show(msg as string, {
            duration: 2000,
            position: Toast.positions.CENTER,
          });
        }
      }
    });
    setTimeout(() => {
      if (toast) {
        Toast.hide(toast);
      }
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Image
        source={{
          uri: 'https://android-class.oss-cn-hangzhou.aliyuncs.com/logo(1).png',
        }}
        style={styles.logo}
      />
      <View style={styles.form}>
        <Input
          defaultValue="icecream"
          placeholder="请输入用户名"
          label="用户名"
          onChangeText={setUsername}
        />
        <Input
          defaultValue="123456"
          placeholder="请输入密码"
          label="密码"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <View style={styles.btnView}>
          <Button
            title="登录"
            type="solid"
            color="#57c3c2"
            onPress={handleLogin}
          />
          <Button title="暂无密码？去注册" type="clear" onPress={goRegister} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  logo: {
    width: 200,
    height: 100,
  },
  form: {
    marginTop: 20,
    width: '80%',
  },
  title: {
    marginBottom: 20,
    fontSize: 32,
    fontWeight: 'bold',
  },
  btnView: {
    width: '100%',
  },
});

export default Login;
