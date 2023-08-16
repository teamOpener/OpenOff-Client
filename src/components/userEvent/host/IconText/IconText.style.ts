import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const iconTextStyles = StyleSheet.create({
  alignItemCenter: {
    alignItems: 'center',
  },
  peopleText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
});

export default iconTextStyles;
