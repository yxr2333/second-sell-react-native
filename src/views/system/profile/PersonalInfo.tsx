import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Dialog, Icon, ListItem } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
const PersonalInfo: React.FC<NativeStackScreenProps<any, any>> = () => {
  React.useEffect(() => {
    // 从redux中拿userId,然后根据userId去请求用户信息
  });
  const [visible, setVisible] = React.useState(false);
  return (
    // <AuthChecker navigation={navigation}>
    <ScrollView style={styles.container}>
      <Text style={styles.tips}>基本信息</Text>

      {/* 头像 */}
      <ListItem>
        <ListItem.Content>
          <Text style={styles.label}>头像</Text>
        </ListItem.Content>
        <ListItem.Content right>
          <View>
            <Avatar
              rounded
              size={80}
              source={{
                uri: 'https://android-class.oss-cn-hangzhou.aliyuncs.com/IMG_5138.JPG',
              }}
            />
          </View>
        </ListItem.Content>
      </ListItem>

      {/* 会员名 */}
      <ListItem>
        <ListItem.Content>
          <Text style={styles.label}>会员名</Text>
        </ListItem.Content>
        <ListItem.Content right>
          <Text style={styles.content}>icecream</Text>
        </ListItem.Content>
      </ListItem>

      {/* 简介 */}
      <ListItem onPress={() => setVisible(true)}>
        <ListItem.Content>
          <Text style={styles.label}>简介</Text>
        </ListItem.Content>
        <ListItem.Content right>
          <Icon name="chevron-right" type="feather" size={16} />
        </ListItem.Content>
      </ListItem>

      <Dialog isVisible={visible}>
        <Dialog.Title title="个人简介" />
        <Text>我是一名Java程序员</Text>
        <Dialog.Actions>
          <Dialog.Button title="关闭" onPress={() => setVisible(false)} />
        </Dialog.Actions>
      </Dialog>
    </ScrollView>
    // </AuthChecker>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  tips: {
    fontSize: 14,
    color: '#999',
  },
  label: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 17,
    color: '#666',
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
});
export default PersonalInfo;
