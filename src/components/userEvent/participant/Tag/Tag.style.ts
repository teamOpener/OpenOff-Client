import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const tagStyles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 16,
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
  } as TextStyle,
});

export default tagStyles;
