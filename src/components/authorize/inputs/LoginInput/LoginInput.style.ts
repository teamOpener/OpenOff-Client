import { Platform, StyleSheet } from 'react-native';
import textStyles from 'styles/textStyles';

const loginInputStyles = StyleSheet.create({
  container: {
    margin: Platform.OS === 'android' ? 7 : 15,
    flexDirection: 'column',
  },
  input: {
    width: 350,
    borderBottomWidth: 2,
    backgroundColor: 'transparent',
    ...textStyles.body2,
  },
  inputTitle: {
    color: 'white',
    marginBottom: Platform.OS === 'android' ? 2 : 20,
  },
  errorText: {
    color: 'red',
  },
});

export default loginInputStyles;
