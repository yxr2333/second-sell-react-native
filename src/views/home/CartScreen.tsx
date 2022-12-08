import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card, CheckBox, FAB, Image, ListItem, Text } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import useCartList from '../../hooks/useCartList';
import { StackParamList } from './../../types/index.d';

import ImageView from 'react-native-image-viewing';
import { ImageSource } from 'react-native-image-viewing/dist/@types';
type Props = NativeStackScreenProps<StackParamList, 'CartList'>;
const CartScreen: React.FC<Props> = ({ navigation }) => {
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [carts, setCarts] = React.useState(
    useCartList().map(item => {
      let decription = '';
      let maxLength = 20;
      if (item.decription && item.decription?.length > maxLength) {
        decription = item.decription.substring(0, maxLength) + '...';
        return {
          ...item,
          decription,
          isChecked: false,
        };
      }
      return {
        ...item,
        isChecked: false,
      };
    }),
  );
  /**
   * 选中购物车中的某个商品
   * @param idx 购物车索引
   */
  const handlePressCartItem = (idx: number) => {
    if (carts[idx].isChecked) {
      setTotalPrice(totalPrice - carts[idx].price);
    } else {
      setTotalPrice(totalPrice + carts[idx].price);
    }
    carts[idx].isChecked = !carts[idx].isChecked;
    setCarts([...carts]);
  };
  const [selectAll, setSelectAll] = React.useState(false);
  /**
   * 全选购物车
   */
  const handleSelectAll = () => {
    carts.forEach(item => (item.isChecked = !selectAll));
    let sum = 0;
    carts.forEach(item => {
      if (item.isChecked) {
        sum += item.price;
      }
    });
    setTotalPrice(sum);
    setSelectAll(!selectAll);
    setCarts([...carts]);
  };

  /**
   * 跳转界面页面
   */
  const handleGoToSettlement = () => {
    navigation.navigate('Settlement');
  };
  const [visible, setIsVisible] = React.useState(false);
  const [imageList, setImageList] = React.useState<ImageSource[]>([]);

  /**
   * 点击图片事件
   * @param url 图片地址
   */
  const handlePressImage = (url: string) => {
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
      <ScrollView style={{ marginBottom: 10 }}>
        <Card>
          <View style={styles.header}>
            <CheckBox
              checked={selectAll}
              onPress={() => handleSelectAll()}
              title="全选"
            />
            <Text style={{ fontSize: 20 }}>
              当前金额：
              <Text style={styles.price}>{totalPrice}元</Text>
            </Text>
          </View>
          <View>
            {carts.map((item, index) => (
              <ListItem
                bottomDivider
                key={index}
                containerStyle={{ marginBottom: 15 }}>
                {/* 选择框 */}
                <ListItem.CheckBox
                  checked={item.isChecked}
                  onPress={() => handlePressCartItem(index)}
                />
                <ListItem.Content>
                  <View style={styles.cartItem}>
                    <Image
                      onPress={() => handlePressImage(item.image)}
                      source={{ uri: item.image }}
                      style={{ width: 100, height: 100, flex: 1 }}
                    />
                    <View style={styles.cartItemGoods}>
                      <Text style={styles.desc}>{item.decription}</Text>
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
                      <Text style={styles.num}>x{item.num}</Text>
                    </View>
                  </View>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </Card>
      </ScrollView>
      <View>
        <FAB
          onPress={() => handleGoToSettlement()}
          title={`结算(${carts.filter(item => item.isChecked).length})`}
          buttonStyle={{ backgroundColor: '#57c3c2' }}
          icon={{ name: 'shopping-cart', color: 'white' }}
          style={styles.fabBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  fabBtn: {
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
});

export default CartScreen;
