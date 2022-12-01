import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon, ListItem } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
const SecureDetail: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  const info = {
    name: 'icecream',
    phone: '17786170105',
    email: 'xinruiyu0616@gmail.com',
  };
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
      case 'delete':
        console.log('删除账号');
        break;
    }
  };
  return (
    // <AuthChecker navigation={navigation}>
    <ScrollView style={styles.container}>
      {/* 会员名 */}
      <ListItem>
        <ListItem.Content>
          <Text style={styles.label}>会员名</Text>
        </ListItem.Content>
        <ListItem.Content right>
          <Text style={styles.content}>{info.name}</Text>
        </ListItem.Content>
      </ListItem>

      {/* 手机号 */}
      <ListItem onPress={() => handlePress('phone')}>
        <ListItem.Content>
          <Text style={styles.label}>手机号</Text>
        </ListItem.Content>
        <ListItem.Content right>
          <Text style={styles.content}>
            {info.phone}
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
    // </AuthChecker>
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
