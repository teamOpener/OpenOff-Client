import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const userFieldBoxStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 13,
    backgroundColor: '#8B6FE7',
  },
  text: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.white,
  } as TextStyle,
});

export default userFieldBoxStyles;
