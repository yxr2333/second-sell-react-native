import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card, Icon, SearchBar, Text } from '@rneui/themed';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';
import WaterfallFlow from 'react-native-waterfall-flow';
import GoodsFilter from '../../components/GoodsFilter';
import useGoodsList from '../../hooks/useGoodsList';
import { StackParamList } from '../../types';

type Props = NativeStackScreenProps<StackParamList, 'GoodsList'>;
// 获取屏幕高度
const GoodsList: React.FC<Props> = ({ route, navigation }) => {
  const { title } = route.params;
  const [search, setSearch] = React.useState('');
  const [refreshing] = React.useState(false);
  const waterFlowRef = React.useRef<WaterfallFlow>(null);
  const [hasMore, setHasMore] = React.useState(true);
  const loadData = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useGoodsList().map(item => {
      return {
        ...item,
        height: Math.floor(Math.random() * 300 + 100),
        image: `${item.image}?${Math.random()}`,
      };
    });
  };

  const [goodsList, setGoodsList] = React.useState(loadData);

  useEffect(() => {
    if (title) {
      navigation.setOptions({
        title,
        headerRight: () => (
          <Icon
            type="antdesign"
            name="totop"
            color={'#fff'}
            onPress={() => {
              waterFlowRef.current?.scrollToIndex({
                animated: true,
                viewPosition: 0,
                index: 0,
              });
            }}
          />
        ),
      });
    }
  });
  /**
   * 更新搜索框中的文字
   * @param text 输入的文字
   */
  const updateSearch = (text: string) => {
    setSearch(text);
  };

  /**
   * 查看商品详情
   * @param id 商品id
   */
  const handleSeeDetail = (id: number) => {
    navigation.navigate('GoodsDetails', { goodsId: id });
  };
  const handleReachEnd = () => {
    console.log('reach end');
    if (hasMore === false) {
      Toast.show('没有更多了', {
        duration: 1500,
        position: Toast.positions.CENTER,
        animation: true,
        shadow: true,
        delay: 0,
      });
    } else {
      setGoodsList([...goodsList, ...loadData()]);
      setHasMore(false);
    }
  };
  const handleRefresh = () => {
    setTimeout(() => {
      console.log('refresh');
    }, 3000);
  };
  return (
    // @ts-ignore
    <WaterfallFlow
      ref={waterFlowRef}
      refreshing={refreshing}
      onEndReached={() => handleReachEnd()}
      onEndReachedThreshold={0.01}
      onRefresh={handleRefresh}
      style={styles.container}
      initialNumToRender={4}
      data={goodsList}
      numColumns={2}
      ListHeaderComponent={
        <React.Fragment>
          <SearchBar
            platform="android"
            style={styles.searchView}
            placeholder="请输入搜索内容..."
            value={search}
            onChangeText={updateSearch}
          />
          <GoodsFilter />
        </React.Fragment>
      }
      renderItem={({ item, index, columnIndex }) => {
        return (
          <Card
            key={'' + index + columnIndex}
            containerStyle={styles.cardContainer}>
            <Card.Image
              onPress={() => handleSeeDetail(item.id)}
              source={{ uri: item.image }}
              style={{ height: item.height }}
            />
            <View>
              <Text style={styles.goodsDesc}>{item.desc}</Text>
              <Text style={styles.priceText}>
                ￥
                <Text style={{ fontSize: 24, color: 'red' }}>{item.price}</Text>
              </Text>
            </View>
          </Card>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  searchView: {
    margin: 10,
  },
  cardContainer: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  container: {
    marginBottom: 10,
  },
  priceText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'right',
  },
  goodsDesc: {
    color: '#666',
    fontSize: 16,
  },
});

export default GoodsList;
