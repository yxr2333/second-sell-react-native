import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FAB, Input } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { createAddress } from '../../../api/address';
import { StackParamList } from '../../../types';
import { selectUserId } from './../../../store/userSlice';
import MessageUtil from './../../../utils/message';
type Props = NativeStackScreenProps<StackParamList, 'AddAddressScreen'>;
const AddAddressScreen: React.FC<Props> = ({ navigation, route }) => {
  const { refresh } = route.params;
  const [state, setState] = React.useState({
    name: '',
    phone: '',
    address: '',
  });
  const userId = useSelector(selectUserId);
  const handleSave = () => {
    const param = {
      userId,
      name: state.name,
      phone: state.phone,
      address: state.address,
    };
    createAddress(param).then((res: any) => {
      console.log(res);
      const { code } = res;
      if (code === 200) {
        MessageUtil('保存成功');
        refresh();
        setTimeout(function () {
          navigation.goBack();
        }, 1000);
      }
    });
    console.info(state);
  };
  return (
    <View style={{ padding: 20 }}>
      <Input
        placeholder="请输入收货人姓名"
        defaultValue={state.name}
        label="收货人"
        onChangeText={val => setState({ ...state, name: val })}
      />
      <Input
        placeholder="请输入收货人手机号码"
        defaultValue={state.phone}
        label="手机号码"
        onChangeText={val => setState({ ...state, phone: val })}
      />
      <Input
        placeholder="请输入收货人地址"
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
export default AddAddressScreen;
