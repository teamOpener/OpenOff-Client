import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const openEventStyles = StyleSheet.create({
  textWrapper: {
    margin: 0,
    padding: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#B9B9B9',
    backgroundColor: '#B9B9B910',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  textWrapperDisabled: {
    backgroundColor: '#B9B9B930',
  },
  textWrapperError: {
    borderColor: colors.error,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.white,
  } as TextStyle,
  placeholder: {
    color: '#A4A4A4',
  } as TextStyle,
});

export default openEventStyles;
