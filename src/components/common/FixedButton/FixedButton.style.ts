import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const fixedButtonStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
  },
  button: {
    marginHorizontal: 25,
    marginBottom: 35,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  disabledButton: {
    backgroundColor: colors.darkGrey,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    lineHeight: 17 * 1.4,
  } as TextStyle,
});

export default fixedButtonStyles;
