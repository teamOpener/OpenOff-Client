import { Platform, StyleSheet } from 'react-native';
import { getPixelSize } from 'styles/styleUtils';
import { fonts } from 'styles/theme';

const essentialInputStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
  },
  inputContainer: {
    margin: 0,
    paddingVertical: Platform.select({
      android: getPixelSize(14),
      ios: 14,
    }),
    paddingBottom: 14 + 15 * 0.4,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    includeFontPadding: false,
    textAlignVertical: 'center',
    fontFamily: fonts.semibold,
  },
  inputAbsoluteContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  phoneInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    marginBottom: 5,
  },
  validateStatus: {
    position: 'absolute',
    top: Platform.select({
      android: 8,
      ios: 14,
    }),
    right: 16,
  },
  helpTextContainer: {
    marginTop: 5,
    flex: 1,
  },
});

export default essentialInputStyles;
