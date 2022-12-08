import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, BottomSheet, Dialog, Icon, ListItem } from '@rneui/themed';
import * as React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import { ImageSource } from 'react-native-image-viewing/dist/@types';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../../api/common';
import { updateUserBaseInfo } from '../../../api/user';
import { selectUserInfo, updateAvatar } from '../../../store/userSlice';
import { UpdateUserBaseInfoParam } from '../../../types/request/developRequest';
import AuthChecker from '../../../utils/AuthChecker';
const PersonalInfo: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  React.useEffect(() => {
    // 从redux中拿userId,然后根据userId去请求用户信息
  });
  const userInfo = useSelector(selectUserInfo);
  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [imageList, setImageList] = React.useState<ImageSource[]>([]);
  const [imageVisible, setImageVisible] = React.useState(false);
  const dispatch = useDispatch();
  /**
   * 长按图片的回调
   */
  const handleLongPress = () => {
    setBottomSheetVisible(true);
  };

  const handeLoadImage = (choice: number) => {
    if (choice === 0) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then((image: { path: any }) => {
          const { path } = image;
          let source;
          if (Platform.OS === 'android') {
            // Android
            source = path;
          }
          let formData = new FormData();
          let file = {
            uri: source,
            type: 'image/jpeg',
            name: source.split('/').pop(),
          };
          formData.append('file', file);
          uploadImage(formData)
            .then(res => res.json())
            .then(res => {
              console.log(res);
              const { code, data } = res;
              if (code === 200) {
                showMessage({
                  message: '上传成功',
                  type: 'success',
                });
                const apiData: UpdateUserBaseInfoParam = {
                  id: userInfo.id,
                  username: userInfo.username,
                  description: userInfo.description || '',
                  avatar: data,
                };
                updateUserBaseInfo(apiData)
                  .then((res2: any) => {
                    const code2 = res2.code;
                    if (code2 === 200) {
                      /* 更新Store中的信息 */
                      dispatch(updateAvatar(data));
                      showMessage({
                        message: '更新成功',
                        type: 'success',
                      });
                    } else {
                      showMessage({
                        message: '更新失败',
                        type: 'danger',
                      });
                    }
                  })
                  .catch((err: any) => {
                    console.error(err);
                    showMessage({
                      message: '更新失败',
                      type: 'danger',
                    });
                  });
              }
            })
            .catch(err => {
              console.error('文件上传失败', err);
            });
        })
        .catch((err: any) => {
          console.log('取消选择');
          console.error(err);
        });
    } else if (choice === 1) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then((image: { path: any }) => {
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
            .then(res => res.json())
            .then(res => {
              console.log(res);
              const { code, data } = res;
              if (code === 200) {
                showMessage({
                  message: '上传成功',
                  type: 'success',
                });
                const apiData: UpdateUserBaseInfoParam = {
                  id: userInfo.id,
                  username: userInfo.username,
                  description: userInfo.description || '',
                  avatar: data,
                };
                updateUserBaseInfo(apiData)
                  .then((res2: any) => {
                    const code2 = res2.code;
                    if (code2 === 200) {
                      showMessage({
                        message: '更新成功',
                        type: 'success',
                      });
                      /* 更新Store中的信息 */
                      dispatch(updateAvatar(data));
                      setImageList([{ uri: userInfo.avatar }]);
                    } else {
                      showMessage({
                        message: '更新失败',
                        type: 'danger',
                      });
                    }
                  })
                  .catch((err: any) => {
                    console.error(err);
                    showMessage({
                      message: '更新失败',
                      type: 'danger',
                    });
                  });
              }
            })
            .catch(err => {
              console.error('文件上传失败', err);
            });
        })
        .catch((err: any) => {
          console.log('取消选择');
          console.error(err);
        });
    }
    setBottomSheetVisible(false);
    setImageVisible(false);
  };
  return (
    <AuthChecker navigation={navigation}>
      <ScrollView style={styles.container}>
        <Text style={styles.tips}>基本信息</Text>
        <BottomSheet
          isVisible={bottomSheetVisible}
          modalProps={{}}
          onBackdropPress={() => {
            setBottomSheetVisible(false);
          }}>
          <ListItem onPress={() => handeLoadImage(0)}>
            <ListItem.Content>
              <ListItem.Title>拍照</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem onPress={() => handeLoadImage(1)}>
            <ListItem.Content>
              <ListItem.Title>从相册中选取照片</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </BottomSheet>
        <ImageView
          onLongPress={() => handleLongPress()}
          images={imageList}
          imageIndex={0}
          visible={imageVisible}
          onRequestClose={() => setImageVisible(false)}
        />
        {/* 头像 */}
        <ListItem>
          <ListItem.Content>
            <Text style={styles.label}>头像</Text>
          </ListItem.Content>
          <ListItem.Content right>
            <View>
              <Avatar
                onPress={() => {
                  setImageList([{ uri: userInfo.avatar }]);
                  setImageVisible(true);
                }}
                rounded
                size={80}
                source={{
                  uri: userInfo.avatar,
                }}
              />
            </View>
          </ListItem.Content>
        </ListItem>

        {/* 会员名 */}
        <ListItem>
          <ListItem.Content>
            <Text style={styles.label}>会员名</Text>
          </ListItem.Content>
          <ListItem.Content right>
            <Text style={styles.content}>{userInfo.username}</Text>
          </ListItem.Content>
        </ListItem>

        {/* 简介 */}
        <ListItem onPress={() => setVisible(true)}>
          <ListItem.Content>
            <Text style={styles.label}>简介</Text>
          </ListItem.Content>
          <ListItem.Content right>
            <Icon name="chevron-right" type="feather" size={16} />
          </ListItem.Content>
        </ListItem>

        <Dialog isVisible={visible}>
          <Dialog.Title title="个人简介" />
          <Text>{userInfo.description ? userInfo.description : '暂无'}</Text>
          <Dialog.Actions>
            <Dialog.Button title="关闭" onPress={() => setVisible(false)} />
          </Dialog.Actions>
        </Dialog>
      </ScrollView>
    </AuthChecker>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  tips: {
    fontSize: 14,
    color: '#999',
  },
  label: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 17,
    color: '#666',
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
});
export default PersonalInfo;
