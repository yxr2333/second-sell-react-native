import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card, CheckBox, FAB, Image, ListItem, Text } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import useCartList from '../../hooks/useCartList';
import { StackParamList } from './../../types/index.d';
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
  const handleGoToSettlement = () => {
    navigation.navigate('Settlement');
  };
  return (
    <View>
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
                <ListItem.CheckBox
                  checked={item.isChecked}
                  onPress={() => handlePressCartItem(index)}
                />
                <ListItem.Content>
                  {/* <ListItem.Title>{item.decription}</ListItem.Title> */}
                  <View style={styles.cartItem}>
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: 100, height: 100 }}
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
  },
  cartItemGoods: {
    display: 'flex',
    flexDirection: 'column',
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
