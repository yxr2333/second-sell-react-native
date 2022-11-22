import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Feed: React.FC = () => {
  return (
    <View>
      <Text style={styles.title}>Feed</Text>
      <Text style={styles.title}>Feed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
  },
});

export default Feed;
