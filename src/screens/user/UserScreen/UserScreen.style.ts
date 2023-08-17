import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const userScreenStyles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
  fieldContainer: {
    alignItems: 'center',
    gap: 13,
  },
  fieldResetButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  fieldResetText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: fonts.semibold,
    color: colors.white,
  },
  userInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 46,
    marginBottom: 45,
  },
  emailText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: fonts.regular,
  },
  userBasicContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  profileMainContainer: {
    position: 'relative',
  },
  userProfileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 300,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.darkGrey,
  },
  userProfileImage: {
    width: 60,
    height: 60,
  },
  pencilPosition: {
    zIndex: 99,
    position: 'absolute',
    top: 1,
    right: -1,
  },
  userNoneImage: {
    marginTop: 10,
  },
  userControllerContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 20,
  },
});

export default userScreenStyles;
