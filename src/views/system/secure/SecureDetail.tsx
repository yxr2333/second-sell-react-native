import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dialog, Icon, Input, ListItem } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail } from '../../../store/userSlice';
import { selectUserInfo } from './../../../store/userSlice';

const SecureDetail: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  const userInfo = useSelector(selectUserInfo);
  const [visible, setVisible] = React.useState(false);
  const [newMail, setNewMail] = React.useState('');
  const dispatch = useDispatch();
  const handlePress = (oper: string) => {
    switch (oper) {
      case 'phone':
        navigation.push('ResetPhoneScreen');
        console.log('修改电话号码');
        break;
      case 'modifyPassword':
        navigation.push('ResetPasswordScreen');
        console.log('修改密码');
        break;
      case 'email':
        setVisible(true);
        console.log('修改邮箱');
        break;
      case 'delete':
        showMessage({
          message: '删除账号',
          description: '暂不支持',
          type: 'danger',
        });
        break;
    }
  };

  const handleConfirmNewMail = () => {
    console.log(newMail);
    // 校验邮箱格式
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (newMail === '' || !reg.test(newMail)) {
      showMessage({
        message: '请输入正确的邮箱地址',
        type: 'danger',
      });
      return;
    }
    dispatch(updateEmail(newMail));
    setVisible(false);
  };
  return (
    <React.Fragment>
      <Dialog isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <Dialog.Title title="修改邮箱" />
        <Input placeholder="请输入新邮箱..." onChangeText={setNewMail} />
        <Dialog.Actions>
          <Dialog.Button title="确认" onPress={handleConfirmNewMail} />
          <Dialog.Button title="取消" onPress={() => setVisible(false)} />
        </Dialog.Actions>
      </Dialog>

      {/* <AuthChecker navigation={navigation}> */}
      <ScrollView style={styles.container}>
        {/* 会员名 */}
        <ListItem>
          <ListItem.Content>
            <Text style={styles.label}>会员名</Text>
          </ListItem.Content>
          <ListItem.Content right>
            <Text style={styles.content}>{userInfo.username}</Text>
          </ListItem.Content>
        </ListItem>

        {/* 手机号 */}
        <ListItem onPress={() => handlePress('phone')}>
          <ListItem.Content>
            <Text style={styles.label}>手机号</Text>
          </ListItem.Content>
          <ListItem.Content right>
            <Text style={styles.content}>
              {userInfo.phone ? userInfo.phone : '未绑定'}
              <Icon name="chevron-right" type="feather" size={14} />
            </Text>
          </ListItem.Content>
        </ListItem>

        {/* 邮箱 */}
        <ListItem onPress={() => handlePress('email')}>
          <ListItem.Content>
            <Text style={styles.label}>修改邮箱</Text>
          </ListItem.Content>
          <ListItem.Content right>
            <Text style={styles.content}>
              <Icon name="chevron-right" type="feather" size={14} />
            </Text>
          </ListItem.Content>
        </ListItem>
        {/* 修改登录密码 */}
        <ListItem onPress={() => handlePress('modifyPassword')}>
          <ListItem.Content>
            <Text style={styles.label}>修改登录密码</Text>
          </ListItem.Content>
          <ListItem.Content right>
            <Text style={styles.content}>
              <Icon name="chevron-right" type="feather" size={14} />
            </Text>
          </ListItem.Content>
        </ListItem>
        {/* 注销账号 */}
        <ListItem onPress={() => handlePress('delete')}>
          <ListItem.Content>
            <Text style={styles.label}>注销账号</Text>
          </ListItem.Content>
          <ListItem.Content right>
            <Text style={styles.content}>
              <Icon name="chevron-right" type="feather" size={14} />
            </Text>
          </ListItem.Content>
        </ListItem>
      </ScrollView>
      {/* </AuthChecker> */}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
    color: '#000',
  },
  content: {
    fontSize: 16,
  },
});
export default SecureDetail;
