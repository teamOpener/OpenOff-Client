import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const agreeToTermScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.background,
    position: 'relative',
  },
  scrollContainer: {
    flex: 1,
  },
  checkButtonContainer: {
    flexDirection: 'column',
    width: 350,
  },
});

export default agreeToTermScreenStyles;
