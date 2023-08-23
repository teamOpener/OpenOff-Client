import notifee, { AndroidImportance } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { permitAlert } from 'apis/user';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { PERMISSIONS } from 'react-native-permissions';
import { useAuthorizeStore } from 'stores/Authorize';
import AsyncAuthorizeStorage from 'types/apps/asyncAuthorizeStorage';
import { requestSinglePermission } from './permission';

const { setFcmToken } = useAuthorizeStore.getState();

export const getToken = async () => {
  const deviceInfo = await DeviceInfo.getUniqueId();
  const value = await AsyncStorage.getItem('authorize');
  const authorizeStore: AsyncAuthorizeStorage = JSON.parse(value ?? '');
  if (!authorizeStore.state.fcmToken) {
    const fcmDeviceToken = await messaging().getToken();
    await permitAlert({
      fcmToken: fcmDeviceToken,
      deviceId: deviceInfo,
    });
    setFcmToken(fcmDeviceToken);
    return;
  }
  if (authorizeStore.state.fcmToken) {
    messaging().onTokenRefresh(async (refreshFcmToken) => {
      await permitAlert({
        fcmToken: refreshFcmToken,
        deviceId: deviceInfo,
      });
      setFcmToken(refreshFcmToken);
    });
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

const handleDisplayNotification = async ({
  title = '',
  body = '',
}: {
  title?: string;
  body?: string;
}) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'OpenOffChannel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
    },
  });
};

export const foregroundListener = () => {
  messaging().onMessage(async (message) => {
    const title = message?.notification?.title;
    const body = message?.notification?.body;
    handleDisplayNotification({ title, body });
  });
};
