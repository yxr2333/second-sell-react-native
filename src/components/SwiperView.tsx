import { Image } from '@rneui/themed';
import * as React from 'react';
import { Dimensions, View } from 'react-native';
import Swiper from 'react-native-swiper';

const SwiperView = () => {
  return (
    <Swiper
      showsButtons
      autoplay={false}
      autoplayTimeout={3}
      loop={true}
      index={0}
      activeDotColor="#000"
      dotColor="#fff">
      <View>
        <Image
          style={{ width: Dimensions.get('window').width, height: '100%' }}
          source={{
            uri: 'https://android-class.oss-cn-hangzhou.aliyuncs.com/c53c811f880411ebb6edd017c2d2eca2.jpg',
          }}
        />
      </View>
      <View>
        <Image
          style={{ width: Dimensions.get('window').width, height: '100%' }}
          source={{
            uri: 'https://android-class.oss-cn-hangzhou.aliyuncs.com/01217514880511ebb6edd017c2d2eca2.jpg',
          }}
        />
      </View>
      <View>
        <Image
          style={{ width: Dimensions.get('window').width, height: '100%' }}
          source={{
            uri: 'https://android-class.oss-cn-hangzhou.aliyuncs.com/wallhaven-g7ezp3.png',
          }}
        />
      </View>
    </Swiper>
  );
};

export default SwiperView;
