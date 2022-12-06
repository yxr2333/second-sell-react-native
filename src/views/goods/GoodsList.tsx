import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card, Icon, SearchBar, Text } from '@rneui/themed';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import WaterfallFlow from 'react-native-waterfall-flow';
import { getGoodsListByTypeId } from '../../api/goods';
import GoodsFilter from '../../components/GoodsFilter';
import { StackParamList } from '../../types';
import { GetGoodsByTypeResult } from '../../types/response/developResponse';

type Props = NativeStackScreenProps<StackParamList, 'GoodsList'>;
// 获取屏幕高度
const GoodsList: React.FC<Props> = ({ route, navigation }) => {
  const { title, typeId } = route.params;
  const [page, setPage] = React.useState(1);
  const [size] = React.useState(10);
  const [goods, setGoods] = React.useState<any[]>([]);
  React.useEffect(() => {
    getGoodsListByTypeId(typeId, page, size).then((res: any) => {
      const { code, data } = res as GetGoodsByTypeResult;
      if (code === 200 && data) {
        // 给每个商品添加一个随机高度
        const dataList = data.data.map(item => {
          return {
            ...item,
            height: Math.floor(Math.random() * 300 + 100),
          };
        });
        setGoods(dataList);
        showMessage({
          message: '加载成功',
          type: 'success',
        });
      }
    });
  }, [page, size, typeId]);
  const [search, setSearch] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const waterFlowRef = React.useRef<WaterfallFlow>(null);

  /**
   * 设置标题和右上角的功能按键
   */
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
    getGoodsListByTypeId(typeId, page + 1, size).then((res: any) => {
      const { code, data } = res as GetGoodsByTypeResult;
      if (code === 200 && data) {
        const { totalNum, totalPage } = data;
        if (totalNum <= totalPage * size) {
          showMessage({
            message: '没有更多数据了',
            type: 'warning',
          });
          return;
        }
        // 给每个商品添加一个随机高度
        const dataList = data.data.map(item => {
          return {
            ...item,
            height: Math.floor(Math.random() * 300 + 100),
          };
        });
        setPage(page + 1);
        setGoods(dataList);
        showMessage({
          message: '加载成功',
          type: 'success',
        });
      }
    });
  };

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    getGoodsListByTypeId(typeId, page, size).then((res: any) => {
      const { code, data } = res as GetGoodsByTypeResult;
      if (code === 200 && data) {
        // 给每个商品添加一个随机高度
        const dataList = data.data.map(item => {
          return {
            ...item,
            height: Math.floor(Math.random() * 300 + 100),
          };
        });
        setGoods(dataList);
        setRefreshing(false);
        showMessage({
          message: '加载成功',
          type: 'success',
        });
      }
    });
  }, [page, size, typeId]);
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
      data={goods}
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
              source={{ uri: item.cover }}
              style={{ height: item.height }}
            />
            <View>
              <Text style={styles.goodsDesc}>{item.description}</Text>
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
    height: '100%',
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
