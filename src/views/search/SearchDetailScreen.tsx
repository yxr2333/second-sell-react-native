import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import { StackParamList } from './../../types/index.d';
type Props = NativeStackScreenProps<StackParamList, 'SearchDetailScreen'>;
const SearchDetailScreen: React.FC<Props> = ({ route }) => {
  const { keyword } = route.params;
  return (
    <View>
      <Text>SearchDetailScreen</Text>
      <Text>{keyword}</Text>
    </View>
  );
};
export default SearchDetailScreen;
