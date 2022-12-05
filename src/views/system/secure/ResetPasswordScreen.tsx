import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { sendCodeByEmail } from '../../../api/common';
import { updateLoginPassword } from '../../../api/user';
import {
  logout,
  selectUserEmail,
  selectUserId,
} from '../../../store/userSlice';
import { UpdateUserLoginPasswordParam } from '../../../types/request/developRequest';
import {
  SendCodeByEmailResult,
  SendCodeEmailInfo,
} from '../../../types/response/developResponse';

let timer: any;
type Props = NativeStackScreenProps<any, any>;
const ResetPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    code: '',
  });
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [reverseTime, setReverseTime] = React.useState(60);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [buttonText, setButtonText] = React.useState('获取验证码');
  const email = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [codeState, setCodeState] = React.useState<SendCodeEmailInfo>({
    verifyCode: '',
    requestKey: '',
  });
  React.useEffect(() => {
    clearInterval(timer);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    console.log('reverseTime', reverseTime);

    if (reverseTime > 0 && reverseTime < 60) {
      setButtonText(`${reverseTime}秒后重试`);
    } else {
      clearInterval(timer);
      setIsDisabled(false);
      setReverseTime(60);
    }
  }, [reverseTime]);

  const handleSendCode = () => {
    console.info('发送验证码');

    sendCodeByEmail(email).then((res: any) => {
      const { code, data } = res as SendCodeByEmailResult;
      if (code === 200 && data) {
        console.log(data);
        setCodeState(data);
        timer = setInterval(() => {
          setReverseTime(pre => pre - 1);
        }, 1000);
        setIsDisabled(true);
      }
    });
  };

  const handleConfirm = () => {
    console.log('确认修改密码');
    const { oldPassword, newPassword, confirmPassword, code } = formData;
    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
      showMessage({
        message: '请输入完整信息',
        type: 'danger',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage({
        message: '两次密码输入不一致',
        type: 'danger',
      });
      return;
    }
    if (code === '') {
      showMessage({
        message: '请输入验证码',
        type: 'danger',
      });
      return;
    }
    if (code !== codeState.verifyCode) {
      showMessage({
        message: '验证码错误',
        type: 'danger',
      });
      return;
    }
    let param: UpdateUserLoginPasswordParam = {
      userId,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      requestKey: codeState.requestKey,
      code: formData.code,
    };
    updateLoginPassword(param).then((res: any) => {
      const { msg, data } = res;
      const resCode = res.code;
      if (resCode === 200) {
        console.log(data);
        showMessage({
          message: '修改成功，请重新登录！',
          type: 'success',
        });
        dispatch(logout());
        setTimeout(() => {
          navigation.replace('Login');
        }, 1000);
      } else {
        showMessage({
          message: msg,
          type: 'danger',
        });
      }
    });
  };
  return (
    <View style={{ padding: 20 }}>
      <Input
        secureTextEntry
        placeholder="请输入旧密码"
        label="旧密码"
        onChangeText={text => setFormData({ ...formData, oldPassword: text })}
      />
      <Input
        secureTextEntry
        placeholder="请输入新密码"
        label="新密码"
        onChangeText={text => setFormData({ ...formData, newPassword: text })}
      />
      <Input
        secureTextEntry
        placeholder="请确认新密码"
        label="确认新密码"
        onChangeText={text =>
          setFormData({ ...formData, confirmPassword: text })
        }
      />
      <View>
        <Input
          placeholder="请输入验证码"
          label="验证码"
          onChangeText={text => setFormData({ ...formData, code: text })}
        />
        <Button disabled={isDisabled} onPress={handleSendCode}>
          {isDisabled ? `${reverseTime}秒后重试` : '获取验证码'}
        </Button>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="确认" size="lg" type="outline" onPress={handleConfirm} />
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
