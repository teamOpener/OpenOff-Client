import { StyleSheet } from 'react-native';
import { fonts } from 'styles/theme';

const essentialInputStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
  },
  inputContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    fontSize: 15,
    fontFamily: fonts.semibold,
  },
  inputAbsoluteContainer: {
    flex: 1,
  },
  phoneInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    marginBottom: 5,
  },
  validateStatus: {
    position: 'absolute',
    top: 14,
    right: 16,
  },
  helpTextContainer: {
    marginTop: 5,
    flex: 1,
  },
});

export default essentialInputStyles;
