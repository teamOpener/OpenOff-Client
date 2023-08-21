import { Platform, StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const birthSettingInputStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelText: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    lineHeight: 18 * 1.4,
  } as TextStyle,
  input: {
    flex: 1,
    paddingVertical: 6,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  resetPosition: {
    position: 'relative',
    bottom: Platform.OS === 'android' ? 32 : 27,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    gap: 5,
  },
});

export default birthSettingInputStyles;
