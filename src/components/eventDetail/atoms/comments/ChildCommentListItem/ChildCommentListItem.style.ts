import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const childCommentListItemStyles = StyleSheet.create({
  full: {
    flex: 1,
  },
  contentText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
  nickName: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 14 * 1.4,
  } as TextStyle,
  dateText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 13 * 1.4,
  } as TextStyle,
});

export default childCommentListItemStyles;
