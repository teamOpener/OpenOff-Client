import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const agreeToTermScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.background,
    position: 'relative',
  },
  titleText: {
    width: 300,
    height: 90,
    fontSize: 25,
    color: '#FFF',
    marginBottom: 40,
  },
});

export default agreeToTermScreenStyles;
