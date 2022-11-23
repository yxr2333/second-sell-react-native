import { Avatar, ListItem } from '@rneui/themed';
import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale

const avatar_url =
  'https://android-class.oss-cn-hangzhou.aliyuncs.com/IMG_5138.JPG';
const SettingMenu: React.FC = () => {
  return (
    <ListItem
      style={{ marginTop: 10 }}
      Component={TouchableScale}
      linearGradientProps={{
        colors: ['#FF9800', '#F44336'],
        start: { x: 1, y: 0 },
        end: { x: 0.2, y: 0 },
      }}
      ViewComponent={LinearGradient} // Only if no expo
    >
      <Avatar rounded source={{ uri: avatar_url }} />
      <ListItem.Content>
        <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
          Chris Jackson
        </ListItem.Title>
        <ListItem.Subtitle style={{ color: 'white' }}>
          Vice Chairman
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color="white" />
    </ListItem>
  );
};

export default SettingMenu;
