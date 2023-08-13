import { Platform, StyleSheet, TextStyle } from 'react-native';
import { getPixelSize } from 'styles/styleUtils';
import { colors, fonts } from 'styles/theme';

const phoneAuthButtonStyles = StyleSheet.create({
  buttonWrapper: {
    marginTop: Platform.select({
      android: getPixelSize(5),
      ios: 5,
    }),
    paddingHorizontal: 17,
    paddingVertical: 12,
    borderRadius: 27.5,
    borderWidth: 1,
  },
  activeButton: {
    borderColor: colors.white,
  },
  nonActiveButton: {
    backgroundColor: colors.darkGrey,
    borderColor: colors.darkGrey,
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 13,
  } as TextStyle,
});

export default phoneAuthButtonStyles;
