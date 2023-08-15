import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const dateSelectButtonStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.white,
  } as ViewStyle,
  activeContainer: {
    borderColor: colors.main,
  },
  dateText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 14 * 1.4,
  } as TextStyle,
  countText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 14 * 1.4,
  } as TextStyle,
  activeText: {
    color: colors.main,
  } as TextStyle,
});

export default dateSelectButtonStyles;
