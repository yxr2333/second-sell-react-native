import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Button, Image } from '@rneui/themed';
import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { getGoodsDetailById } from '../../api/goods';
import { StackParamList } from '../../types';
import {
  GetGoodsDetailResult,
  Goods,
} from '../../types/response/developResponse';

type Props = NativeStackScreenProps<StackParamList, 'GoodsDetails'>;
const GoodsDetail: React.FC<Props> = ({ route }) => {
  const { goodsId } = route.params;
  const [goods, setGoods] = React.useState<Goods>();
  React.useEffect(() => {
    getGoodsDetailById(goodsId).then((res: any) => {
      const { code, data } = res as GetGoodsDetailResult;
      if (code === 200) {
        setGoods(data);
      }
    });
  }, [goodsId]);
  return (
    <React.Fragment>
      <View style={styles.buttonContainer}>
        <Button
          size="lg"
          titleStyle={{ color: '#000' }}
          buttonStyle={{
            width: 100,
            backgroundColor: '#f7f7f7',
            borderWidth: 2,
            borderColor: '#f7f7f7',
            borderRadius: 30,
          }}>
          卖同款
        </Button>
        <View style={{ marginLeft: 20 }}>
          <Button
            size="lg"
            titleStyle={{ color: '#000' }}
            buttonStyle={{
              width: 100,
              backgroundColor: '#fbe74f',
              borderColor: '#fbe74f',
              borderWidth: 2,
              borderRadius: 30,
            }}>
            我想要
          </Button>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.userInfo}>
          <Avatar
            size={60}
            rounded
            source={{
              uri: goods?.releaseUser.avatar,
            }}
          />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.username}>{goods?.releaseUser.username}</Text>
            <Text style={styles.phone}>{goods?.releaseUser.phone}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.price}>￥{goods?.price}</Text>
          <View>
            <Text style={{ color: '#999', fontSize: 16 }}>
              {Math.floor(Math.random() * 1000)}浏览
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.decription}>
            {goods?.description || '暂无描述'}
          </Text>
        </View>
        <View style={styles.category}>
          <View style={styles.categoryItem}>
            <Text style={{ color: '#000', fontSize: 16 }}>品牌</Text>
            <Text>{goods?.brand}</Text>
          </View>
          <View style={styles.categoryItem}>
            <Text style={{ color: '#000', fontSize: 16 }}>类型</Text>
            <Text>{goods?.type.name}</Text>
          </View>
        </View>
        <View style={styles.goodsCover}>
          <Text style={{ color: '#000', fontSize: 16 }}>商品封面</Text>
          <Image
            style={{ width: '100%', height: 300, marginTop: 10 }}
            source={{
              uri: goods?.cover,
            }}
          />
        </View>

        <View style={styles.goodsImages}>
          <Text style={{ color: '#000', fontSize: 16 }}>商品图片</Text>
          <Swiper showsButtons autoplay>
            <View>
              <Image
                style={{ width: Dimensions.get('window').width, height: 300 }}
                source={{
                  uri: 'https://android-class.oss-cn-hangzhou.aliyuncs.com/c53c811f880411ebb6edd017c2d2eca2.jpg',
                }}
              />
            </View>
            <View>
              <Image
                style={{ width: Dimensions.get('window').width, height: 300 }}
                source={{
                  uri: 'https://android-class.oss-cn-hangzhou.aliyuncs.com/01217514880511ebb6edd017c2d2eca2.jpg',
                }}
              />
            </View>
          </Swiper>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 17,
  },
  phone: {
    // 灰色
    color: '#999',
  },
  price: {
    color: '#eb5428',
    fontSize: 30,
    fontWeight: 'bold',
  },
  decription: {
    fontSize: 17,
    lineHeight: 30,
    color: '#333',
  },
  category: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  categoryItem: {
    marginRight: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  goodsCover: {
    marginTop: 20,
  },
  goodsImages: {
    height: 300,
    marginTop: 20,
  },
  buttonContainer: {
    zIndex: 9999,
    padding: 10,
    // backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default GoodsDetail;
