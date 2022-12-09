import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import { findUserBuyGoods } from '../../../api/userinfo';
import OperateGoodsList from '../../../components/OperateGoodsList';
import { selectUserId } from '../../../store/userSlice';
import {
  GetUserBuyGoodsResult,
  Goods,
} from '../../../types/response/developResponse';
import AuthChecker from './../../../utils/AuthChecker';
const Resell: React.FC<NativeStackScreenProps<any, any>> = ({ navigation }) => {
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
    findUserBuyGoods(userId).then((res: any) => {
      const { code, data } = res as GetUserBuyGoodsResult;
      if (code === 200 && data) {
        setGoods(data);
      }
    });
  }, [userId]);
  return (
    <AuthChecker navigation={navigation}>
      <View>
        <OperateGoodsList
          goodsList={goods}
          title="可转卖"
          navigataion={navigation}
        />
      </View>
    </AuthChecker>
  );
};
export default Resell;
