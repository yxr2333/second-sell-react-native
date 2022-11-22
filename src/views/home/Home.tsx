import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartScreen from './CartScreen';

import SignInScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import SpikeScreen from './SpikeScreen';

const MyHome = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          } else if (route.name === 'Spike') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }
          if (iconName) {
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        headerStyle: {
          backgroundColor: '#57c3c2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={SignInScreen as any}
        options={{
          title: '首页',
        }}
      />
      <Tab.Screen
        name="Spike"
        component={SpikeScreen}
        options={{ title: '秒杀活动' }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen as any}
        options={{ title: '购物车' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen as any}
        options={{
          title: '设置',
        }}
      />
    </Tab.Navigator>
  );
};

export default MyHome;
