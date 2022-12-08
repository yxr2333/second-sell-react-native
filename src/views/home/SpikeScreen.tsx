import { Tab, TabView } from '@rneui/themed';
import * as React from 'react';
import Pricing from '../../components/Pricing';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions, View } from 'react-native';

type Props = NativeStackScreenProps<any, any>;
const SpikeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [index, setIndex] = React.useState(0);
  const [w, setW] = React.useState(0);
  const handleChange = (num: number) => {
    setTimeout(() => {
      setIndex(num);
    });
  };
  React.useEffect(() => {
    const { width } = Dimensions.get('window');
    setTimeout(() => {
      setW(width);
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
        <Tab.Item title="特价活动" />
        {/* <Tab.Item title="日用品类" /> */}
        {/* <Tab.Item title="电子产品类" /> */}
      </Tab>
      <TabView
        value={index}
        onChange={handleChange}
        animationType="spring"
        disableSwipe={false}>
        <TabView.Item>
          <View style={{ width: w }}>
            <Pricing navigation={navigation} route={route} />
          </View>
        </TabView.Item>
        {/* <TabView.Item>
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
        </TabView.Item> */}
      </TabView>
    </>
  );
};

export default SpikeScreen;
