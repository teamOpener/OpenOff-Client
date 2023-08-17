import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const nickNameListStyles = StyleSheet.create({
  searchItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGrey,
  },
  searchText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: colors.white,
  } as TextStyle,
});

export default nickNameListStyles;
