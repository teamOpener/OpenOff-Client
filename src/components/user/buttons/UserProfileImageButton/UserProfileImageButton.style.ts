import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const userProfileImageButtonStyles = StyleSheet.create({
  userProfileImage: {
    width: 100,
    height: 100,
  },
  relativeContainer: {
    position: 'relative',
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  userProfileContainer: {
    width: 100,
    height: 100,
    borderRadius: 300,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.darkGrey,
  },
  userProfileNoneImage: {
    marginTop: 20,
  },
  pencilPosition: {
    zIndex: 99,
    position: 'absolute',
    top: 1,
    right: -1,
  },
});

export default userProfileImageButtonStyles;
