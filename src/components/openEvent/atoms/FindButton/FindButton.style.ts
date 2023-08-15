import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const findButtonStyles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: colors.main,
    borderRadius: 100,
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 16.8,
  } as TextStyle,
});

export default findButtonStyles;
