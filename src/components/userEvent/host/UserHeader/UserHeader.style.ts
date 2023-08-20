import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const userHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
    gap: 10,
  },
  userInfo: {
    alignItems: 'center',
  },
  nameText: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 23.87,
  },
  approveBtn: {
    backgroundColor: colors.main,
  },
});

export default userHeaderStyles;
