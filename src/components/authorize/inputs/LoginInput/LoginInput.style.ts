import { Dimensions, Platform, StyleSheet } from 'react-native';
import textStyles from 'styles/textStyles';

const loginInputStyles = StyleSheet.create({
  container: {
    margin: Platform.OS === 'android' ? 7 : 15,
    flexDirection: 'column',
  },
  input: {
    width: Dimensions.get('window').width - 60,
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    ...textStyles.body2,
  },
  inputTitle: {
    color: 'white',
    marginBottom: Platform.OS === 'android' ? 2 : 20,
  },
  validateStatus: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
});

export default loginInputStyles;
