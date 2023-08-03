import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const xSmallTagStyles = StyleSheet.create({
  container: {
    paddingVertical: 3.5,
    paddingHorizontal: 8,
    borderRadius: 25,
    backgroundColor: colors.lavender,
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 8,
    lineHeight: 11.2,
  },
});

export default xSmallTagStyles;
