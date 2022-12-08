import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import React from 'react';
import FlashMessage from 'react-native-flash-message';

import 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './src/store/store';
import GoodsDetail from './src/views/goods/GoodsDetail';
import GoodsList from './src/views/goods/GoodsList';
import Home from './src/views/home/Home';
import ModalScreen from './src/views/ModalScreen';
import SearchDetailScreen from './src/views/search/SearchDetailScreen';
import Settlement from './src/views/settlement/SettleMentScreen';
import SpikeDetailScreen from './src/views/spike/SpikeDetailScreen';
import AddAddressScreen from './src/views/system/address/AddAddressScreen';
import AddressControl from './src/views/system/address/AddressControlPanel';
import EditAddressScreen from './src/views/system/address/EditAddressScreen';
import Login from './src/views/system/Login';
import Bought from './src/views/system/operate/Bought';
import Publish from './src/views/system/operate/Publish';
import Resell from './src/views/system/operate/Resell';
import Sold from './src/views/system/operate/Sold';
import PersonalInfo from './src/views/system/profile/PersonalInfo';
import ResetPasswordScreen from './src/views/system/secure/ResetPasswordScreen';
import ResetPhoneScreen from './src/views/system/secure/ResetPhoneScreen';
import SecureDetail from './src/views/system/secure/SecureDetail';
const params = {
  params: {
    text: 'hello',
  },
};

const main: React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootSiblingParent>
          <NavigationContainer>
            <Toast />
            <FlashMessage position="top" />
            <ApplicationProvider {...eva} theme={eva.light}>
              <Stack.Navigator
                initialRouteName="index"
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#57c3c2',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}>
                <Stack.Group>
                  <Stack.Screen
                    name="index"
                    component={Home}
                    initialParams={params}
                    options={{ headerShown: false, title: '首页' }}
                  />
                  <Stack.Screen
                    name="SearchDetailScreen"
                    component={SearchDetailScreen as any}
                    options={{ title: '搜索结果' }}
                  />
                  <Stack.Screen
                    name="SpikeDetailScreen"
                    component={SpikeDetailScreen as any}
                    options={{ title: '秒杀活动详情' }}
                  />
                  <Stack.Group>
                    <Stack.Screen
                      name="Publish"
                      component={Publish}
                      options={{ title: '我发布的' }}
                    />
                    <Stack.Screen
                      name="Sold"
                      component={Sold}
                      options={{ title: '我卖出的' }}
                    />
                    <Stack.Screen
                      name="Bought"
                      component={Bought}
                      options={{ title: '我买到的' }}
                    />
                    <Stack.Screen
                      name="Resell"
                      component={Resell}
                      options={{ title: '可转卖的' }}
                    />
                  </Stack.Group>

                  <Stack.Screen
                    name="GoodsList"
                    component={GoodsList as any}
                    options={{ title: '商品列表' }}
                  />
                  <Stack.Screen
                    name="GoodsDetails"
                    component={GoodsDetail as any}
                    options={{ title: '商品详情' }}
                  />
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: '登录' }}
                  />
                  <Stack.Screen
                    name="Settlement"
                    component={Settlement}
                    options={{ title: '结算' }}
                  />
                </Stack.Group>
                <Stack.Group>
                  <Stack.Screen
                    name="PersonalInfo"
                    component={PersonalInfo}
                    options={{ title: '个人资料设置' }}
                  />
                  <Stack.Group>
                    <Stack.Screen
                      name="AddressControl"
                      component={AddressControl}
                      options={{
                        title: '地址管理',
                      }}
                    />
                    <Stack.Screen
                      name="EditAddressScreen"
                      component={EditAddressScreen as any}
                      options={{
                        title: '编辑收货地址',
                      }}
                    />
                    <Stack.Screen
                      name="AddAddressScreen"
                      component={AddAddressScreen as any}
                      options={{
                        title: '新增收货地址',
                      }}
                    />
                  </Stack.Group>
                  <Stack.Group>
                    <Stack.Screen
                      name="SecureDetail"
                      component={SecureDetail}
                      options={{ title: '账号与安全' }}
                    />
                    <Stack.Screen
                      name="ResetPasswordScreen"
                      component={ResetPasswordScreen}
                      options={{ title: '修改账户密码' }}
                    />
                    <Stack.Screen
                      name="ResetPhoneScreen"
                      component={ResetPhoneScreen}
                      options={{ title: '修改绑定电话' }}
                    />
                  </Stack.Group>
                </Stack.Group>
                <Stack.Group>
                  <Stack.Screen
                    name="modal"
                    component={ModalScreen}
                    options={{ presentation: 'modal', headerShown: false }}
                  />
                </Stack.Group>
              </Stack.Navigator>
            </ApplicationProvider>
          </NavigationContainer>
        </RootSiblingParent>
      </Provider>
    </SafeAreaProvider>
  );
};

// const styles = StyleSheet.create({
//   screenStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 20,
//   },
// });

export default main;
