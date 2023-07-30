import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const labelStyles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 21,
    color: colors.white,
  } as TextStyle,
});

export default labelStyles;
