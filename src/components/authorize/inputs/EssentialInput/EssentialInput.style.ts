import { Platform, StyleSheet } from 'react-native';
import { fonts } from 'styles/theme';

const essentialInputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1.5,
    fontSize: 15,
    fontFamily: fonts.semibold,
  },
  inputAbsoluteContainer: {
    position: 'relative',
  },
  phoneInputContainer: {
    flexDirection: 'column',
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 4,
  },
  validateStatus: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 15 : 8,
    right: 10,
  },
});

export default essentialInputStyles;
