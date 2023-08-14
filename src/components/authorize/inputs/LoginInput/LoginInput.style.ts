import { StyleSheet } from 'react-native';
import textStyles from 'styles/textStyles';

const loginInputStyles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    ...textStyles.body2,
  },
  inputTitle: {
    marginBottom: 10,
  },
  validateStatus: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default loginInputStyles;
