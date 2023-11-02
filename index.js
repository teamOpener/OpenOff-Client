/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import 'locales';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // 백그라운드 메시지를 수신할 때 호출되는 콜백 함수
  console.log('Message handled in the background!', remoteMessage);
});

// 앱이 백그라운드에서 실행되었는지 확인
function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // iOS에서 백그라운드에서 앱이 실행되었으므로 무시합니다.
    return null;
  }

  // 포그라운드 실행 시 앱 컴포넌트를 렌더링합니다.
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
