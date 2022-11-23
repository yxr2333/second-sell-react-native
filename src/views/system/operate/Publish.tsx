import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import AuthChecker from './../../../utils/AuthChecker';
const Publish: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  return (
    <AuthChecker navigation={navigation}>
      <View>
        <Text>Hello</Text>
      </View>
    </AuthChecker>
  );
};
export default Publish;
