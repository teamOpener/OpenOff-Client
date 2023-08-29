import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const parentCommentListItemStyles = StyleSheet.create({
  full: {
    flex: 1,
  },
  container: { flex: 1, alignItems: 'center' },
  left: { flex: 1 },
  alignItems: {
    flex: 1,
  },
  nickName: {
    paddingTop: 1,
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
  content: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
  dateText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 13 * 1.4,
  } as TextStyle,
  replyButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 13 * 1.4,
  } as TextStyle,
  replyCountText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 12 * 1.4,
  } as TextStyle,
  replyCountButton: {
    marginLeft: 10,
  },
});

export default parentCommentListItemStyles;
