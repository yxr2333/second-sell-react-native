import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FAB, Input } from '@rneui/themed';
import * as React from 'react';
import { Text, View } from 'react-native';
import { StackParamList } from '../../../types';
type Props = NativeStackScreenProps<StackParamList, 'EditAddressScreen'>;
const EditAddressScreen: React.FC<Props> = ({ route }) => {
  const { addressId } = route.params;
  const [state, setState] = React.useState({
    name: 'icecream',
    phone: '17786170105',
    address: '湖北省宜昌市西陵区大学路8号',
  });
  const handleSave = () => {
    console.info(state);
  };
  return (
    <View style={{ padding: 20 }}>
      <Text>addressId: {addressId}</Text>
      <Input
        defaultValue={state.name}
        label="收货人"
        onChangeText={val => setState({ ...state, name: val })}
      />
      <Input
        defaultValue={state.phone}
        label="手机号码"
        onChangeText={val => setState({ ...state, phone: val })}
      />
      <Input
        defaultValue={state.address}
        label="收货地址"
        onChangeText={val => setState({ ...state, address: val })}
      />
      <FAB
        onPress={handleSave}
        title="保存"
        containerStyle={{ width: '75%' }}
        buttonStyle={{ backgroundColor: '#57c3c2' }}
      />
    </View>
  );
};
export default EditAddressScreen;
