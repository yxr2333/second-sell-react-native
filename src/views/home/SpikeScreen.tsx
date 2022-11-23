import { Avatar, Image, ListItem, Tab, TabView, Text } from '@rneui/themed';
import * as React from 'react';
import Pricing from '../../components/Pricing';

import { Dimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
const SpikeScreen: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [w, setW] = React.useState(0);
  const [h, setH] = React.useState(0);
  const handleChange = (num: number) => {
    setTimeout(() => {
      setIndex(num);
    });
  };
  React.useEffect(() => {
    const { width, height } = Dimensions.get('window');
    setTimeout(() => {
      setW(width);
      setH(height);
    });
  });
  return (
    <>
      <Tab
        value={index}
        onChange={e => handleChange(e)}
        indicatorStyle={{
          backgroundColor: 'red',
          height: 3,
        }}
        containerStyle={{
          backgroundColor: '#fff',
        }}
        titleStyle={{
          color: '#000',
        }}
        variant="primary">
        <Tab.Item title="特价商品" />
        <Tab.Item title="日用品类" />
        <Tab.Item title="电子产品类" />
      </Tab>
      <TabView
        value={index}
        onChange={handleChange}
        animationType="spring"
        disableSwipe={true}>
        <TabView.Item>
          <View style={{ width: w }}>
            <Pricing />
          </View>
        </TabView.Item>
        <TabView.Item>
          <>
            <ScrollView
              style={{
                width: w,
              }}>
              <View style={{ width: w, height: h / 4 }}>
                <SwiperView />
              </View>
              {Array.from({ length: 20 }).map((_, i) => (
                <ListItem key={i}>
                  <Avatar
                    size={64}
                    title="Hello"
                    source={{
                      uri: 'https://android-class.oss-cn-hangzhou.aliyuncs.com/IMG_5138.JPG',
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{i + 1} name</ListItem.Title>
                    <ListItem.Subtitle>sub-name</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Content right>
                    <ListItem.Title right style={{ color: 'red' }}>
                      23.8￥
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              ))}
            </ScrollView>
          </>
        </TabView.Item>
        <TabView.Item>
          <Text>Tab 3</Text>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default SpikeScreen;
