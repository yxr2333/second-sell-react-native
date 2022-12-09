import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import { findUserSellGoods } from '../../../api/userinfo';
import OperateGoodsList from '../../../components/OperateGoodsList';
import {
  GetUserSellGoodsResult,
  Goods,
} from '../../../types/response/developResponse';
import AuthChecker from '../../../utils/AuthChecker';
import { selectUserId } from './../../../store/userSlice';
const Sold: React.FC<NativeStackScreenProps<any, any>> = ({ navigation }) => {
  const [goods, setGoods] = React.useState<Goods[]>([]);
  const userId = useSelector(selectUserId);
  if (!userId) {
    showMessage({
      message: '请先登录',
      type: 'danger',
    });
    navigation.navigate('Login');
  }
  React.useEffect(() => {
    findUserSellGoods(userId).then((res: any) => {
      const { code, data } = res as GetUserSellGoodsResult;
      if (code === 200 && data) {
        setGoods(data);
      }
    });
  }, [userId]);
  return (
    <AuthChecker navigation={navigation}>
      <View>
        {/*TODO: 卖出的商品要去重 */}
        <OperateGoodsList
          goodsList={goods}
          title="卖出"
          navigataion={navigation}
        />
      </View>
    </AuthChecker>
  );
};
export default Sold;
