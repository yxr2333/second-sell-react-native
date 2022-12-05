import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import { StackParamList } from '../../types';
type Props = NativeStackScreenProps<StackParamList, 'SpikeDetailScreen'>;
const SpikeDetailScreen: React.FC<Props> = ({ route }) => {
  const { spikeId } = route.params;
  return (
    <View>
      <Text>SpikeDetail</Text>
      <Text>{spikeId}</Text>
    </View>
  );
};
export default SpikeDetailScreen;
