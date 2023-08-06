import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const userProfileEditScreenStyles = StyleSheet.create({
  container: {
    gap: 25,
    padding: 30,
  },
  emailContainer: {
    gap: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: fonts.semibold,
    color: colors.grey,
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
  },
  userProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 300,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.darkGrey,
  },
  withdrawalContainer: {
    gap: 5,
  },
  withdrawalInfo: {
    fontSize: 10,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  withdrawal: {
    fontSize: 10,
    fontFamily: fonts.semibold,
    color: colors.white,
    underline: { textDecorationLine: 'underline' },
  },
});

export default userProfileEditScreenStyles;
