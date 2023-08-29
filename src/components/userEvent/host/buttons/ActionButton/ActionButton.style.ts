import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const actionButtonStyles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 16,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledContainer: {
    backgroundColor: colors.grey,
  },
  labelText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 17.9,
  } as TextStyle,
});

export default actionButtonStyles;
