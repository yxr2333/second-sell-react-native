import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';
import { StackParamList } from '../../types';

type Props = NativeStackScreenProps<StackParamList, 'GoodsDetails'>;
const GoodsDetail: React.FC<Props> = ({ route }) => {
  const { goodsId } = route.params;
  return (
    <View>
      <Text>GoodsDetail</Text>
      <Text>{goodsId}</Text>
    </View>
  );
};

export default GoodsDetail;
