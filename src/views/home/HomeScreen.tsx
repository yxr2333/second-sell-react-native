import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Button, Card, Icon, SearchBar, Text } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { randomGetGoods } from '../../api/goods';
import useIcons from '../../hooks/useIcons';
import { IconItem } from '../../types';
import {
  GetRandomGoodsResult,
  GoodsSimpleInfo,
} from '../../types/response/developResponse';

type Props = NativeStackScreenProps<any, any>;
const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = React.useState('');
  const [goods, setGoods] = React.useState<GoodsSimpleInfo[]>([]);
  React.useEffect(() => {
    randomGetGoods(5).then(res => {
      //@ts-ignore
      const { code, data } = res as GetRandomGoodsResult;
      if (code === 200 && data) {
        console.log(data);
        setGoods(data);
      }
    });
  }, []);
  const updateSearch = (text: any) => {
    setSearch(text);
  };
  const icons = useIcons() as IconItem[][];
  const handlePressIcon = (title?: string, typeId?: number) => {
    console.log(title);
    if (title) {
      navigation.navigate('GoodsList', { title, typeId });
    }
  };
  const handleSubmitEditing = () => {
    if (search && search.length > 0) {
      navigation.navigate('SearchDetailScreen', { keyword: search });
    }
  };
  return (
    <View>
      <SearchBar
        platform="android"
        style={styles.searchView}
        placeholder="请输入搜索内容..."
        value={search}
        onSubmitEditing={handleSubmitEditing}
        onChangeText={updateSearch}
      />
      <ScrollView style={{ marginBottom: 100 }}>
        <View style={styles.avatarView}>
          {icons.map((row, rIndex) => (
            <View key={rIndex} style={styles.avatarViewRow}>
              {row.map((item, index) => (
                <View
                  key={index}
                  style={styles.avatarWrapper}
                  onTouchStart={() => handlePressIcon(item.text, item.id)}>
                  <Avatar
                    size={64}
                    rounded
                    icon={item.icon}
                    containerStyle={item.bg}
                  />
                  <Text style={{ marginTop: 8 }}>{item.text}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View>
          {goods.map((item, index) => (
            <Card key={index}>
              <Card.Title>{item.name}</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0, width: '100%' }}
                source={{
                  uri: item.cover,
                }}
              />
              <Text style={{ marginBottom: 10 }}>{item.description}</Text>
              <Button
                onPress={() =>
                  navigation.navigate('GoodsDetails', { goodsId: item.id })
                }
                icon={
                  <Icon
                    name="code"
                    color="#ffffff"
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="查看详情"
              />
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    margin: 10,
  },
  avatarView: {
    paddingTop: 15,
    paddingBottom: 15,
    display: 'flex',
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // flexWrap: 'wrap',
  },
  avatarViewRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  purpleBg: {
    backgroundColor: '#9700b9',
  },
  blueBg: {
    backgroundColor: '#2089dc',
  },
  avatarWrapper: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default SignInScreen;
