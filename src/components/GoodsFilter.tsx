import { OverflowMenu } from '@ui-kitten/components';
import { Button, IndexPath, MenuItem } from '@ui-kitten/components/ui';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  // 选项切换事件的回调
  selectChange: (index: IndexPath) => void;
};
const GoodsFilter: React.FC<Props> = ({ selectChange }) => {
  const [visible, setVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [buttonText, setButtonText] = React.useState('综合查询');
  const handleSelect = (index: IndexPath) => {
    selectChange(index);
    setSelectedIndex(index);
    setVisible(false);
    switch (index.row) {
      case 0:
        setButtonText('综合查询');
        break;
      case 1:
        setButtonText('价格升序');
        break;
      case 2:
        setButtonText('价格降序');
        break;
      case 3:
        setButtonText('最新发布');
        break;
      default:
        break;
    }
  };
  const renderToggleButton = () => (
    <Button
      onPress={() => setVisible(true)}
      style={{ backgroundColor: '#57c3c2', borderColor: '#57c3c2' }}>
      {buttonText}
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
