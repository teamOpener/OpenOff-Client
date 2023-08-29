import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const declarationButtonStyles = StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: colors.darkGrey,
    paddingVertical: 6,
    paddingHorizontal: 7,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    position: 'absolute',
    top: 20,
    right: 0,
    minWidth: 40,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 13 * 1.4,
  } as TextStyle,
});

export default declarationButtonStyles;
