import { StyleSheet } from 'react-native';

const essentialInputStyles = StyleSheet.create({
  container: {
    width: 365,
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputContainer: {
    height: 54,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  phoneInputContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    alignItems: 'flex-start',
    marginLeft: 10,
    marginBottom: 4,
  },
  validateStatus: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
});

export default essentialInputStyles;
