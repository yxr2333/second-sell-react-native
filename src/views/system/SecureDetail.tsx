import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import AuthChecker from '../../utils/AuthChecker';
const SecureDetail: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  return (
    <AuthChecker navigation={navigation}>
      <View>
        <Text>SecureDetail SecureDetail</Text>
      </View>
    </AuthChecker>
  );
};
export default SecureDetail;
