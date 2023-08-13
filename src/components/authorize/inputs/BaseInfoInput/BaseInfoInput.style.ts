import { Platform, StyleSheet, TextStyle } from 'react-native';
import textStyles from 'styles/textStyles';
import { fonts } from 'styles/theme';

const baseInfoInputStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelText: {
    fontFamily: fonts.semibold,
    fontSize: 18,
  } as TextStyle,
  input: {
    flex: 1,
    paddingVertical: 6,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    ...textStyles.body1,
  },
  resetPosition: {
    position: 'relative',
    bottom: Platform.OS === 'android' ? 32 : 27,
  },
  resetImage: {
    width: 18,
    height: 18,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    gap: 5,
  },
});

export default baseInfoInputStyles;
