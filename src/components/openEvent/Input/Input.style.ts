import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const inputStyles = StyleSheet.create({
  container: {
    gap: 5,
    flex: 1,
  },
  errorTextWrapper: {
    borderColor: colors.error,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.white,
  } as TextStyle,
});

export default inputStyles;
