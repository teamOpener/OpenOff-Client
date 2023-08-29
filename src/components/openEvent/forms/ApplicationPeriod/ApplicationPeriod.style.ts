import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const applicationPeriodStyles = StyleSheet.create({
  inputContainer: {
    gap: 5,
  },
  dateTimePickerContainer: {
    gap: 12,
  },
  dateTimePickerContentContainer: {
    columnGap: 12,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
  dateTimePickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});

export default applicationPeriodStyles;
