import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const checkButtonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkContainer: {
    width: 18,
    height: 18,
    marginRight: 10,
    marginVertical: 16,
  },
  check: {
    width: 18,
    height: 18,
  },
  checkButtonLabel: {
    fontSize: 17,
    lineHeight: 17 * 1.4,
    fontFamily: fonts.semibold,
  } as TextStyle,
});

export default checkButtonStyles;
