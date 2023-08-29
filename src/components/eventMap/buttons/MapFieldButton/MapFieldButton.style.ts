import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const mapFieldButtonStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 17,
    borderColor: colors.black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12.5,
    paddingVertical: 5.5,
    marginRight: 5,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 13 * 1.4,
  },
});

export default mapFieldButtonStyles;
