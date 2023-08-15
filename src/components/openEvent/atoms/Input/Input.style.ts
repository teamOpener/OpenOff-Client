import { Platform, StyleSheet, TextStyle } from 'react-native';
import { getPixelSize } from 'styles/styleUtils';
import { colors, fonts } from 'styles/theme';

const inputStyles = StyleSheet.create({
  container: {
    gap: 5,
    flex: 1,
  },
  errorTextWrapper: {
    borderColor: colors.error,
  },
  disabledTextWrapper: {
    backgroundColor: '#B9B9B930',
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: colors.white,
  } as TextStyle,
  textInputContainer: {
    paddingVertical: Platform.select({
      android: getPixelSize(7),
      ios: 7,
    }),
  },
});

export default inputStyles;
