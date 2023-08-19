import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const textButtonStyles = StyleSheet.create({
  container: {
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
});

export default textButtonStyles;
