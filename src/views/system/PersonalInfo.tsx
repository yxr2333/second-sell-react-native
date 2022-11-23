import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import AuthChecker from '../../utils/AuthChecker';
const PersonalInfo: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  React.useEffect(() => {
    // 从redux中拿userId,然后根据userId去请求用户信息
  });
  return (
    <AuthChecker navigation={navigation}>
      <View>
        <Text>PersonalInfo</Text>
      </View>
    </AuthChecker>
  );
};
export default PersonalInfo;
