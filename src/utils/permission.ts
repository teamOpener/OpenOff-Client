import { Platform } from 'react-native';
import {
  PERMISSIONS,
  Permission,
  RESULTS,
  check,
  checkMultiple,
  request,
  requestMultiple,
} from 'react-native-permissions';

const permissionIOSKey = [
  PERMISSIONS.IOS.CAMERA,
  PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
];
const permissionAndroidKey = [
  PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PERMISSIONS.ANDROID.CAMERA,
];

const calcPermissionKey = (): Permission[] => {
  if (Platform.OS === 'android') return permissionAndroidKey;
  if (Platform.OS === 'ios') return permissionIOSKey;
  return [];
};

const requestMultiplePermissions = async () => {
  try {
    const checkResults = await checkMultiple(calcPermissionKey());
    const requestKeys = calcPermissionKey().filter(
      (permission) => checkResults[permission] === RESULTS.DENIED,
    );
    await requestMultiple(requestKeys);
  } catch (error) {
    console.log(error);
  }
};

const requestSinglePermisson = async (permission: Permission) => {
  try {
    const checkResult = await check(permission);
    if (checkResult === RESULTS.DENIED) await request(permission);
  } catch (error) {
    console.log(error);
  }
};

export { requestMultiplePermissions, requestSinglePermisson };
