import { StyleSheet } from 'react-native';
import { IconItem } from '../types';

const styles = StyleSheet.create({
  purpleBg: {
    backgroundColor: '#9700b9',
  },
  themeBg: {
    backgroundColor: '#57c3c2',
  },
  blueBg: {
    backgroundColor: '#2089dc',
  },
  orangeBg: {
    backgroundColor: '#ec5c37',
  },
  yelloBg: {
    backgroundColor: '#f4b742',
  },
});
// 标注useIcons的返回值类型
export default function useIcons(choice?: number): IconItem[] | null {
  if (!choice || choice === 1) {
    return list1;
  } else if (choice === 2) {
    return list2;
  } else {
    return null;
  }
}

const list1 = [
  {
    icon: {
      name: 'phone',
      type: 'font-awesome',
    },
    bg: styles.themeBg,
    text: '手机',
  },
  {
    icon: {
      name: 'laptop',
      type: 'font-awesome',
    },
    bg: styles.themeBg,
    text: '电脑设备',
  },
  {
    icon: {
      name: 'shopping-cart',
      type: 'font-awesome',
    },
    bg: styles.themeBg,
    text: '日用品',
  },
  {
    icon: {
      name: 'hamburger',
      type: 'font-awesome-5',
    },
    bg: styles.themeBg,
    text: '食品',
  },
  {
    icon: {
      name: 'shopping-bag',
      type: 'font-awesome-5',
    },
    bg: styles.themeBg,
    text: '包包',
  },
  {
    icon: {
      name: 'shoe-sneaker',
      type: 'material-community',
    },
    bg: styles.themeBg,
    text: '鞋子',
  },
  {
    icon: {
      name: 'tags',
      type: 'ant-design',
    },
    bg: styles.themeBg,
    text: '衣物',
  },
  {
    icon: {
      name: 'baseball-ball',
      type: 'font-awesome-5',
    },
    bg: styles.themeBg,
    text: '运动',
  },
];
const list2 = [
  {
    icon: {
      name: 'shopping-bag',
      type: 'font-awesome-5',
    },
    bg: styles.orangeBg,
    text: '我发布的',
    nameKey: 'Publish',
  },
  {
    icon: {
      name: 'money-check-alt',
      type: 'font-awesome-5',
    },
    bg: styles.blueBg,
    text: '我卖出的',
    nameKey: 'Sold',
  },
  {
    icon: {
      name: 'pay-circle1',
      type: 'ant-design',
    },
    bg: styles.yelloBg,
    text: '我买到的',
    nameKey: 'Bought',
  },
  {
    icon: {
      name: 'taobao-circle',
      type: 'ant-design',
    },
    bg: styles.orangeBg,
    text: '我可转卖的',
    nameKey: 'Resell',
  },
];
