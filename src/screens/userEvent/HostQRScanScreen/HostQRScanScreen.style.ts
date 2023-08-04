import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const hostQRScanScreenStyles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'red',
  },
  container: {
    backgroundColor: '#19191910',
    tintColor: '#000000',
    marginTop: '-10%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 42,
  },
  cameraWrapper: {
    width: 300,
    height: 300,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.main,
    justifyContent: 'center',
  },
  mainText: {
    fontFamily: fonts.semibold,
    fontSize: 18,
  } as TextStyle,
  subText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    textAlign: 'center',
  } as TextStyle,
  resultWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.main,
    position: 'absolute',
    bottom: 70,
    maxWidth: '90%',
  },
  resultText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  } as TextStyle,
  requestCameraPermission: {
    textAlign: 'center',
  } as TextStyle,
});

export default hostQRScanScreenStyles;
