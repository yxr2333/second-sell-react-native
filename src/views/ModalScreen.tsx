import { Button } from '@rneui/themed';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ModalScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.screenStyle}>
      <Text>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
};

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
});

export default ModalScreen;
