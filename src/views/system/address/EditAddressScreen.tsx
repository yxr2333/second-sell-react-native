import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Dialog, FAB, Input } from '@rneui/themed';
import * as React from 'react';
import { Text, View } from 'react-native';
import { deleteAddressById, findAddressById } from '../../../api/address';
import { StackParamList } from '../../../types';
import { UpdateAddressParam } from '../../../types/request/developRequest';
import {
  AddressInfo,
  GetAddressByIdResult,
} from '../../../types/response/developResponse';
import { updateAddress } from './../../../api/address';
import MessageUtil from './../../../utils/message';

type Props = NativeStackScreenProps<StackParamList, 'EditAddressScreen'>;
const EditAddressScreen: React.FC<Props> = ({ navigation, route }) => {
  navigation.setOptions({
    headerRight: () => (
      <Button
        onPress={() => setVisible(true)}
        type="clear"
        title="删除"
        titleStyle={{ color: '#fff', fontSize: 20 }}
      />
    ),
  });
  const { addressId, refresh } = route.params;
  const [visible, setVisible] = React.useState(false);
  const [state, setState] = React.useState<AddressInfo>({
    id: 0,
    name: '',
    phone: '',
    address: '',
  });
  const handleDelete = () => {
    deleteAddressById(addressId).then((res: any) => {
      const { code } = res;
      if (code === 200) {
        MessageUtil('删除成功');
        refresh();
        navigation.goBack();
      }
    });
  };
  /**
   * 通过地址id获取地址信息
   */
  React.useEffect(() => {
    findAddressById(addressId).then((res: any) => {
      const { code, data } = res as GetAddressByIdResult;
      if (code === 200 && data) {
        setState(data);
      }
    });
  }, [addressId]);
  /**
   * 点击保存按钮后的回调
   */
  const handleSave = () => {
    let param: UpdateAddressParam = {
      id: state.id,
      name: state.name,
      phone: state.phone,
      address: state.address,
    };
    updateAddress(param).then((res: any) => {
      console.log(res);
      const { code } = res;
      if (code === 200) {
        MessageUtil('修改成功');
      }
      refresh();
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    });
    console.info(state);
  };
  return (
    <React.Fragment>
      <Dialog isVisible={visible}>
        <Dialog.Title title="提示" />
        <Text style={{ textAlign: 'left', fontSize: 16, padding: 10 }}>
          确定要删除该地址吗？
        </Text>
        <Dialog.Actions>
          <Dialog.Button title="确认" onPress={() => handleDelete()} />
          <Dialog.Button title="取消" onPress={() => setVisible(false)} />
        </Dialog.Actions>
      </Dialog>
      <View style={{ padding: 20 }}>
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
    </React.Fragment>
  );
};
export default EditAddressScreen;
