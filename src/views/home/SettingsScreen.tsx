import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Avatar, BottomSheet, Card, Icon, ListItem, Text } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import SettingMenu from '../../components/SettingMenu';
import useIcons from '../../hooks/useIcons';
import useOperItems from '../../hooks/useOperItems';
import { selectUserToken } from '../../store/userSlice';

const SettingsScreen: React.FC<BottomTabHeaderProps> = ({ navigation }) => {
  const icons = useIcons(2);
  const token = useSelector(selectUserToken);
  const [isVisible, setIsVisible] = React.useState(false);
  const list = useOperItems(setIsVisible);
  const handlePress = () => {
    setIsVisible(true);
  };
  const handleNavigate = (routeName?: string) => {
    if (routeName) {
      navigation.navigate(routeName);
    }
  };
  const handlePressOper = (name?: string) => {
    if (name) {
      if (name === 'logout') {
      } else {
        handleNavigate(name);
      }
    }
    setIsVisible(false);
  };
  React.useEffect(() => {
    console.log(navigation);
    navigation.setOptions({
      headerRight: () => (
        <Icon
          type="antdesign"
          name="setting"
          size={35}
          color="#fff"
          style={{ margin: 10 }}
          onPress={() => handlePress()}
        />
      ),
    });
  });
  return (
    <ScrollView style={styles.wrapper}>
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((item, index) => (
          <ListItem
            key={index}
            containerStyle={item.containerStyle}
            onPress={() => handlePressOper(item.viewName)}>
            {item.icon && (
              <Avatar
                size={50}
                icon={{
                  name: item.icon.name,
                  type: item.icon.type,
                  color: item.icon.color ? item.icon.color : 'black',
                }}
              />
            )}
            <ListItem.Content style={item.contentStyle}>
              <ListItem.Title style={item.titleStyle}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <View style={styles.personInfoView}>
        {token ? (
          <Avatar
            avatarStyle={styles.avatarStyle}
            size={80}
            rounded
            source={{
              uri: 'https://insurence-1304011999.cos.ap-shanghai.myqcloud.com/IMG_4071(20220408-120548).JPG',
            }}
          />
        ) : (
          <Avatar
            onPress={() => handleNavigate('Login')}
            avatarStyle={styles.avatarStyle}
            size={80}
            rounded
            iconStyle={{ backgroundColor: '#000' }}
            icon={{
              type: 'ionicons',
              name: 'person',
            }}
          />
        )}
        {token ? (
          <View style={styles.infoStyle}>
            <Text style={styles.nameStyle}>icecreamQAQ</Text>
            <Text style={styles.nickNameStyle}>会员名: icecreamQAQ</Text>
          </View>
        ) : (
          <Text style={styles.nameStyle}>请先登录</Text>
        )}
      </View>
      <View style={styles.listStyle}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View style={styles.listItemStyle} key={index}>
            <Text style={{ fontWeight: 'bold' }}>12</Text>
            <Text>收藏</Text>
          </View>
        ))}
      </View>
      <View>
        <Card>
          <Card.Title>我的交易</Card.Title>
          <Card.Divider />
          <View style={styles.listStyle}>
            {icons?.map((item, index) => (
              <View style={styles.listItemStyle} key={index}>
                <Avatar
                  onPress={() => handleNavigate(item.nameKey)}
                  size={50}
                  rounded
                  icon={item.icon}
                  containerStyle={item.bg}
                />
                <Text style={{ marginTop: 10 }}>{item.text}</Text>
              </View>
            ))}
          </View>
        </Card>
      </View>
      <SettingMenu />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  personInfoView: {
    width: '100%',
    padding: 20,
    height: 150,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarStyle: {
    flex: 1,
  },
  infoStyle: {
    marginLeft: 20,
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  nickNameStyle: {
    fontSize: 14,
    color: '#999',
  },
  listStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  listItemStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsScreen;