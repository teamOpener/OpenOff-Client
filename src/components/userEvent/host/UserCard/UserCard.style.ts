import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const userCardStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grey,
    backgroundColor: colors.darkGrey,
    flexDirection: 'row',
  },
  leftLine: {
    width: 9,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  joinedLeftLine: {
    backgroundColor: colors.lightGreen,
  },
  rightContainer: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 13,
  },
  userInfoContainer: {
    flex: 1,
  },
  userInfo: {
    alignItems: 'center',
  },
  detailWrapper: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  nameText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 17.9,
  } as TextStyle,
  birthText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 17.9,
  } as TextStyle,
  detailText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 14.32,
  } as TextStyle,
  buttonsContainer: {
    alignItems: 'center',
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

export default userCardStyles;
