import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const categorySelectorStyles = StyleSheet.create({
  wrapper: {
    zIndex: 1,
    alignItems: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 15,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
});

export default categorySelectorStyles;
