import { Platform, StyleSheet, TextStyle } from 'react-native';
import { getPixelSize } from 'styles/styleUtils';
import { colors, fonts } from 'styles/theme';

const questionInputStyles = StyleSheet.create({
  label: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 14 * 1.4,
  } as TextStyle,
  textWrapper: {
    margin: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#B9B9B9',
    backgroundColor: '#B9B9B910',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  inputContainer: {
    alignItems: 'center',
    paddingVertical: Platform.select({
      android: getPixelSize(7),
      ios: 7 + (13 * 0.2) / 2,
    }),
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: Platform.select({
      android: 13 * 1.4,
    }),
    color: colors.white,
  } as TextStyle,
});

export default questionInputStyles;
