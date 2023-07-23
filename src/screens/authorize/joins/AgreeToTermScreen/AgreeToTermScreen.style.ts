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
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 350,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default agreeToTermScreenStyles;
