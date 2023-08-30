import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts, layouts } from 'styles/theme';

const hostQRScanScreenStyles = StyleSheet.create({
  barcodeTextURL: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: colors.white,
    backgroundColor: 'red',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 42,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  cameraWrapper: {
    width: 300,
    height: 300,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.main,
    justifyContent: 'center',
  },
  successCameraWrapper: {
    borderWidth: 5,
    borderColor: colors.lightGreen,
  },
  errorCameraWrapper: {
    borderWidth: 5,
    borderColor: colors.error,
  },
  mainText: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    lineHeight: 18 * 1.4,
  } as TextStyle,
  subText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    textAlign: 'center',
  } as TextStyle,
  requestCameraPermission: {
    textAlign: 'center',
  } as TextStyle,
  absoluteContainer: {
    zIndex: 9999,
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    marginTop: -63.5,
  },
  noPermissionContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
  },
});

export default hostQRScanScreenStyles;
