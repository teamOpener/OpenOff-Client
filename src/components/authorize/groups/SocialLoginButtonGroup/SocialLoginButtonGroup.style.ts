import { StyleSheet } from 'react-native';

const socialLoginButtonGroupStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialLogo: {
    width: 40,
    height: 34.7,
  },
  recentLogin: {
    width: 116,
    height: 29,
    position: 'absolute',
    top: -40,
    right: -28,
  },
  absoluteContainer: {
    position: 'relative',
  },
});

export default socialLoginButtonGroupStyles;
