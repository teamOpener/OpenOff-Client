import messaging from '@react-native-firebase/messaging';
import { PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';
import { useAuthorizeStore } from 'stores/Authorize';
import { requestSinglePermission } from './permission';

const { fcmToken, setFcmToken } = useAuthorizeStore.getState();

export const getToken = async () => {
  if (!fcmToken) {
    const fcmDeviceToken = await messaging().getToken();
    setFcmToken(fcmDeviceToken);
    // TODO 서버로 token 전송
    console.log(fcmDeviceToken);
  }
};

// foreground alarm
export const requestAlarmPermission = async () => {
  if (Platform.OS === 'ios') {
    const authorizationStatus = await messaging().requestPermission();
    const enabled =
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await getToken();
    }
  } else if (Platform.OS === 'android') {
    await requestSinglePermission(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    await getToken();
  }
};

export const foregroundListener = () => {
  messaging().onMessage(async (message) => {
    console.log('foreground message', message);
  });
};
