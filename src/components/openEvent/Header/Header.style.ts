import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const headerStyles = StyleSheet.create({
  title: {
    fontFamily: fonts.semibold,
    fontSize: 23,
    lineHeight: 32.2,
    color: colors.white,
  } as TextStyle,
});

export default headerStyles;
