import { StyleSheet, TextStyle } from 'react-native';
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
  admissionTextWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGreen,
    marginRight: 7,
  },
  admissionText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 17.9,
  } as TextStyle,
});

export default userHeaderStyles;
