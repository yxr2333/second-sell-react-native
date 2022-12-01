import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, FAB, Icon, ListItem, Text } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const AddressControlPanel: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  const handleEditAddress = (id: number) => {
    console.info(id);
    navigation.push('EditAddressScreen', { addressId: id });
  };
  const handleAddAddress = () => {
    navigation.push('AddAddressScreen');
  };
  return (
    // <AuthChecker navigation={navigation}>
    <View style={styles.container}>
      <ScrollView>
        {Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12).map((_, index) => (
          <ListItem key={index}>
            <Avatar
              rounded
              title="i"
              titleStyle={{ color: '#fff', fontWeight: 'bold' }}
              containerStyle={{ backgroundColor: '#83cbac' }}
            />
            <ListItem.Content>
              <ListItem.Title>
                <Text style={styles.name}>icecream&nbsp;&nbsp;</Text>
                <Text style={styles.phone}>17786170105</Text>
              </ListItem.Title>
              <ListItem.Subtitle style={styles.address}>
                湖北省宜昌市西陵区大学路8号
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content right>
              <Icon
                name="edit"
                type="feather"
                iconStyle={{ color: '#010' }}
                onPress={() => handleEditAddress(index)}
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
    // </AuthChecker>
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
