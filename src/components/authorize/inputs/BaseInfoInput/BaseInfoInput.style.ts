import { Platform, StyleSheet } from 'react-native';
import { fonts } from 'styles/theme';

const baseInfoInputStyles = StyleSheet.create({
  container: {
    margin: 7,
    flexDirection: 'column',
    position: 'relative',
  },
  input: {
    width: 365,
    fontSize: 15,
    fontFamily: fonts.semibold,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  inputTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: Platform.OS === 'android' ? 12 : 27,
    fontWeight: '600',
  },
  resetPosition: {
    position: 'relative',
    bottom: Platform.OS === 'android' ? 32 : 27,
  },
  resetImage: {
    width: 18,
    height: 18,
  },
});

export default baseInfoInputStyles;
