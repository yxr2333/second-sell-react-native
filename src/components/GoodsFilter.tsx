import { OverflowMenu } from '@ui-kitten/components';
import { Button, IndexPath, MenuItem } from '@ui-kitten/components/ui';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const GoodsFilter = () => {
  const [visible, setVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(1));
  const handleSelect = (index: IndexPath) => {
    setSelectedIndex(index);
    setVisible(false);
  };
  const renderToggleButton = () => (
    <Button
      onPress={() => setVisible(true)}
      style={{ backgroundColor: '#57c3c2', borderColor: '#57c3c2' }}>
      综合查询
    </Button>
  );
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <OverflowMenu
          anchor={renderToggleButton}
          visible={visible}
          selectedIndex={selectedIndex}
          onBackdropPress={() => setVisible(false)}
          onSelect={index => handleSelect(index)}>
          <MenuItem title="综合" disabled />
          <MenuItem title="价格升序" />
          <MenuItem title="价格降序" />
          <MenuItem title="最新发布" />
        </OverflowMenu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    flex: 1,
  },
});

export default GoodsFilter;
