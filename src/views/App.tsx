import React from 'react';
import {
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack/src/types';
import { ParamListBase } from '@react-navigation/native';

interface AppParamList extends ParamListBase {
  params: {
    text: string;
  };
}

const App: React.FC<NativeStackScreenProps<any>> = ({ navigation, route }) => {
  const handlePress = (e: GestureResponderEvent, path: string) => {
    if (path === 'home') {
      navigation.navigate(path, {
        info: {
          name: 'test',
          id: 1,
        },
      });
    } else if (path === 'profile') {
      navigation.navigate(path, {
        name: 'goods',
      });
    } else {
      navigation.navigate(path);
    }
  };

  const { params } = route?.params as AppParamList;

  return (
    <SafeAreaView>
      <View style={styles.mgBottom10}>
        <Button
          color="primary"
          title="home"
          onPress={e => handlePress(e, 'home')}
        />
      </View>
      <View>
        <Text>{params?.text}</Text>
      </View>
      <View style={styles.mgTop10}>
        <Button
          color="primary"
          title="profile"
          onPress={e => handlePress(e, 'profile')}
        />
      </View>
      <View style={styles.mgTop10}>
        <Button
          color="primary"
          title="logs"
          onPress={e => handlePress(e, 'logs')}
        />
      </View>
      <View style={styles.mgTop10}>
        <Button
          color="primary"
          title="review"
          disabled={false}
          onPress={e => handlePress(e, 'review')}
        />
      </View>
      <View style={styles.mgTop10}>
        <Button
          color="primary"
          title="modal"
          disabled={false}
          onPress={e => handlePress(e, 'modal')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mgBottom10: {
    marginBottom: 10,
  },
  mgTop10: {
    marginTop: 10,
  },
});

export default App;
