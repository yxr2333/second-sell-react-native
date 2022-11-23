import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';
import AuthChecker from '../../utils/AuthChecker';

const AddressControl: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  return (
    <AuthChecker navigation={navigation}>
      <View>
        <Text>地址管理</Text>
      </View>
    </AuthChecker>
  );
};

export default AddressControl;
