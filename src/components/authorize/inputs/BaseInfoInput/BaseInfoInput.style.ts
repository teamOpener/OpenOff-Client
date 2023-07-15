import { StyleSheet } from 'react-native';

const baseInfoInputStyles = StyleSheet.create({
  container: {
    margin: 7,
    flexDirection: 'column',
    position: 'relative',
  },
  input: {
    width: 365,
    fontSize: 18,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  inputTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
  },
  resetPosition: {
    position: 'relative',
    bottom: 32,
  },
  resetImage: {
    width: 18,
    height: 18,
  },
});

export default baseInfoInputStyles;
