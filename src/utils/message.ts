import Toast from 'react-native-root-toast';

export default function MessageUtil(msg?: string) {
  if (!msg) {
    msg = '成功';
  }
  const toast = Toast.show(msg, {
    duration: 2000,
    animation: true,
    shadow: true,
    hideOnPress: true,
    delay: 0,
    position: Toast.positions.CENTER,
    containerStyle: { zIndex: 9999 },
  });
  setTimeout(() => {
    if (toast) {
      Toast.hide(toast);
    }
  }, 1000);
}
