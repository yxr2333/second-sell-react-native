import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import AuthChecker from './../../../utils/AuthChecker';
const Resell: React.FC<NativeStackScreenProps<any, any>> = ({ navigation }) => {
  return (
    <AuthChecker navigation={navigation}>
      <View>
        <Text>Resell</Text>
      </View>
    </AuthChecker>
  );
};
export default Resell;
