import { Platform, StyleSheet } from 'react-native';
import { fonts } from 'styles/theme';

const baseInfoInputStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    position: 'relative',
  },
  input: {
    marginTop: 5,
    width: '100%',
    fontSize: 15,
    paddingVertical: 10,
    fontFamily: fonts.semibold,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  inputTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: Platform.OS === 'android' ? 10 : 14,
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
