import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
const Messages: React.FC = () => {
  return (
    <View>
      <Text style={styles.title}>Messages</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
  },
});

export default Messages;
