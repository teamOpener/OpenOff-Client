import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const userProfileImageButtonStyles = StyleSheet.create({
  userProfileImage: {
    width: 100,
    height: 100,
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
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
});

export default userProfileImageButtonStyles;
