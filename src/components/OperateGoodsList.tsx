import { Card, ListItem } from '@rneui/themed';
import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Goods } from '../types/response/developResponse';
// 生成一个从0-10的数组
type Props = {
  goodsList?: Goods[];
  title: string;
  navigataion: any;
};
const OperateGoodsList: React.FC<Props> = ({
  goodsList,
  title,
  navigataion,
}) => {
  const handleGoDetails = (goodsId: number) => {
    navigataion.navigate('GoodsDetails', { goodsId });
  };
  return (
    <ScrollView>
      <Card>
        <Card.Title>我{title}的商品</Card.Title>
        <Card.Divider />
        {goodsList && goodsList.length > 0 ? (
          <View>
            {goodsList.map((item, idx) => (
              <ListItem
                bottomDivider
                key={idx}
                onPress={() => handleGoDetails(item.id)}>
                <ListItem.Content>
                  <View style={styles.cartItem}>
                    <Image
                      source={{ uri: item.cover }}
                      style={{ width: 100, height: 100, flex: 1 }}
                    />
                    <View style={styles.cartItemGoods}>
                      <Text style={styles.desc}>{item.description}</Text>
                      <Text style={styles.price}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'red',
                            fontWeight: 'bold',
                          }}>
                          ￥
                        </Text>
                        {item.price}
                      </Text>
                    </View>
                  </View>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        ) : (
          <Text style={{ textAlign: 'center' }}>暂无数据</Text>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartItemGoods: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  desc: {
    fontSize: 16,
    color: '#999',
  },
  price: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
  },
  num: {
    fontSize: 16,
    textAlign: 'right',
  },
});
export default OperateGoodsList;
