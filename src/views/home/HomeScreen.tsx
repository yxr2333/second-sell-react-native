import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Button, Card, Icon, SearchBar, Text } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { ImageSource } from 'react-native-image-viewing/dist/@types';
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
  /**
   * 点击图标按钮的回调事件
   * @param title 页面标题
   * @param typeId 商品类别编号
   */
  const handlePressIcon = (title?: string, typeId?: number) => {
    console.log(title);
    if (title) {
      navigation.navigate('GoodsList', { title, typeId });
    }
  };
  /**
   * 确认搜索的回调事件
   */
  const handleSubmitEditing = () => {
    if (search && search.length > 0) {
      navigation.navigate('SearchDetailScreen', { keyword: search });
    }
  };

  const [visible, setIsVisible] = React.useState(false);
  const [imageList, setImageList] = React.useState<ImageSource[]>([]);
  const handlePressCardImage = (url: string) => {
    setImageList([{ uri: url }]);
    setIsVisible(true);
  };
  return (
    <View>
      <ImageView
        images={imageList}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
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
                onPress={() => handlePressCardImage(item.cover)}
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
