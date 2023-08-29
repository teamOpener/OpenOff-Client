import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const qnAItemStyles = StyleSheet.create({
  full: {
    flex: 1,
  },
  answerWrapper: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 8,
    backgroundColor: colors.darkGrey,
    paddingVertical: 11,
    paddingHorizontal: 15,
    height: 120,
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
});

export default qnAItemStyles;
