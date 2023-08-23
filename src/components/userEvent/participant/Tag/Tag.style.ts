import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const tagStyles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: colors.main,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  selectedContainer: {
    backgroundColor: colors.main,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 12 * 1.4,
  } as TextStyle,
});

export default tagStyles;
