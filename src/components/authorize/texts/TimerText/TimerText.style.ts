import { Platform, StyleSheet } from 'react-native';
import { getPixelSize } from 'styles/styleUtils';

const timerTextStyles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    top: Platform.select({
      android: getPixelSize(34),
      ios: 17,
    }),
    right: 16,
    zIndex: 7,
  },
});

export default timerTextStyles;
