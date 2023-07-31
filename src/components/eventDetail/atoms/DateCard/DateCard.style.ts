import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const dateCardStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderColor: colors.main,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  alignCenter: {
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  } as TextStyle,
});

export default dateCardStyles;
