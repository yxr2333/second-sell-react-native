import { Avatar, Button, ListItem } from '@rneui/themed';
import * as React from 'react';
import { Platform, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import { uploadImage } from '../api/common';

const avatar_url =
  'https://android-class.oss-cn-hangzhou.aliyuncs.com/IMG_5138.JPG';
const SettingMenu: React.FC = () => {
  const handleBtnPress = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        const { path } = image;
        let source;
        if (Platform.OS === 'android') {
          // Android
          source = path;
        } else {
          source = path.replace('file://', '');
        }
        let formData = new FormData();
        let file = {
          uri: source,
          type: 'image/jpeg',
          name: source.split('/').pop(),
        };
        formData.append('file', file);

        uploadImage(formData)
          .then(res => {
            if (res) {
              console.log('文件上传成功');
              console.log(res);
            }
          })
          .catch(err => {
            console.error('文件上传失败', err);
          });
      })
      .catch(err => {
        console.log('取消选择');
        console.error(err);
      });
  };
  return (
    <View>
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
      <Button
        containerStyle={{
          marginTop: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        type="solid"
        title="上传图片测试"
        onPress={() => handleBtnPress()}
      />
    </View>
  );
};

export default SettingMenu;
