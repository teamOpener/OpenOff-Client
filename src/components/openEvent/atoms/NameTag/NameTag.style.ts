import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const nameTagStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGrey,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: colors.white,
  } as TextStyle,
});

export default nameTagStyles;
