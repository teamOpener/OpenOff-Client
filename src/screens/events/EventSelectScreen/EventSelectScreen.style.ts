import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { fonts } from 'styles/theme';

const eventSelectScreenStyles = StyleSheet.create({
  selectDate: {
    alignItems: 'center',
  } as ViewStyle,
  selectDateText: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    lineHeight: 23.8,
  } as TextStyle,
});

export default eventSelectScreenStyles;
