import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Button, FAB, Icon, ListItem, Text } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { findAddressByUserId } from '../../../api/address';
import { selectUserId } from '../../../store/userSlice';
import {
  AddressInfo,
  GetAddressByUserIdResult,
} from '../../../types/response/developResponse';
import AuthChecker from '../../../utils/AuthChecker';

const AddressControlPanel: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  const userId = useSelector(selectUserId) as number;

  const refresh = () => {
    findAddressByUserId(userId).then((res: any) => {
      const { code, data } = res as GetAddressByUserIdResult;
      if (code === 200 && data) {
        console.info(data);
        setAddressList(data);
      }
    });
  };

  navigation.setOptions({
    headerRight: () => (
      <Button
        onPress={refresh}
        type="clear"
        title="刷新"
        titleStyle={{ color: '#fff', fontSize: 16 }}
      />
    ),
  });
  const [addressList, setAddressList] = React.useState<AddressInfo[]>([]);
  const handleEditAddress = (id?: number) => {
    console.info(id);
    navigation.push('EditAddressScreen', { addressId: id, refresh });
  };
  const handleAddAddress = () => {
    navigation.push('AddAddressScreen', { refresh });
  };
  React.useEffect(() => {
    console.log('userId', userId);
    findAddressByUserId(userId).then((res: any) => {
      const { code, data } = res as GetAddressByUserIdResult;
      if (code === 200 && data) {
        console.info(data);
        setAddressList(data);
      }
    });
  }, [userId]);
  return (
    <AuthChecker navigation={navigation}>
      <View style={styles.container}>
        <ScrollView>
          {addressList.map((address, index) => (
            <ListItem key={index}>
              <Avatar
                rounded
                title={address.name?.charAt(0)}
                titleStyle={{ color: '#fff', fontWeight: 'bold' }}
                containerStyle={{ backgroundColor: '#83cbac' }}
              />
              <ListItem.Content>
                <ListItem.Title>
                  <Text style={styles.name}>{address.name}&nbsp;&nbsp;</Text>
                  <Text style={styles.phone}>{address.phone}</Text>
                </ListItem.Title>
                <ListItem.Subtitle style={styles.address}>
                  {address.address}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content right>
                <Icon
                  name="edit"
                  type="feather"
                  iconStyle={{ color: '#010' }}
                  onPress={() => handleEditAddress(address.id)}
                />
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
        <View style={styles.btnContainer}>
          <FAB
            onPress={handleAddAddress}
            title="添加收货地址"
            containerStyle={{ width: '100%' }}
            buttonStyle={{ backgroundColor: '#57c3c2' }}
            icon={{ name: 'shopping-cart', color: 'white' }}
            style={styles.fabBtn}
          />
        </View>
      </View>
    </AuthChecker>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 16,
    color: '#999',
  },
  address: {
    fontSize: 18,
  },
  btnContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  fabBtn: {},
});

export default AddressControlPanel;
