import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import { findUserPublishGoods } from '../../../api/userinfo';
import OperateGoodsList from '../../../components/OperateGoodsList';
import { selectUserId } from '../../../store/userSlice';
import {
  GetUserPublishGoodsResult,
  Goods,
} from '../../../types/response/developResponse';
import AuthChecker from './../../../utils/AuthChecker';
const Publish: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  const userId = useSelector(selectUserId);
  if (!userId) {
    showMessage({
      message: '请先登录',
      type: 'danger',
    });
    navigation.navigate('Login');
  }

  const [goods, setGoods] = React.useState<Goods[]>([]);
  React.useEffect(() => {
    findUserPublishGoods(userId).then((res: any) => {
      const { code, data } = res as GetUserPublishGoodsResult;
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
          title="发布"
          navigataion={navigation}
        />
      </View>
    </AuthChecker>
  );
};

export default Publish;
