import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { permitAlert } from 'apis/user';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { PERMISSIONS } from 'react-native-permissions';
import resetQueryKeys from 'constants/queries/resetQueryKey';
import { useAuthorizeStore } from 'stores/Authorize';
import { requestSinglePermission } from './permission';

const { setFcmToken } = useAuthorizeStore.getState();

export const getToken = async () => {
  try {
    const deviceInfo = await DeviceInfo.getUniqueId();
    const fcmDeviceToken = await messaging().getToken();

    await permitAlert({
      fcmToken: fcmDeviceToken,
      deviceId: deviceInfo,
    });
    setFcmToken(fcmDeviceToken);
  } catch (e) {
    console.warn(e);
  }
};

export const removeToken = async () => {
  try {
    await messaging().deleteToken();
  } catch (e) {
    console.warn(e);
  }
};

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
  resetQueries,
}: {
  title?: string;
  body?: string;
  resetQueries: (keys: Array<Array<string | number | undefined>>) => void;
}) => {
  try {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'OpenOffChannel',
      importance: AndroidImportance.HIGH,
    });
    resetQueries(resetQueryKeys.all);
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_notification',
      },
    });
  } catch (e) {
    console.warn(e);
  }
};

export const foregroundListener = ({
  resetQueries,
}: {
  resetQueries: (keys: Array<Array<string | number | undefined>>) => void;
}) => {
  try {
    messaging().onMessage(async (message) => {
      const title = message?.notification?.title;
      const body = message?.notification?.body;
      handleDisplayNotification({ title, body, resetQueries });
    });
  } catch (e) {
    console.warn(e);
  }
};
