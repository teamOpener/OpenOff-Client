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
    lineHeight: Platform.select({
      android: 13 * 1.4,
    }),
    color: colors.white,
  } as TextStyle,
  textInputContainer: {
    alignItems: 'center',
    paddingVertical: Platform.select({
      android: getPixelSize(7),
      ios: 7 + (13 * 0.2) / 2,
    }),
  },
});

export default inputStyles;
