import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const iconTextStyles = StyleSheet.create({
  alignItemCenter: {
    alignItems: 'center',
  },
  peopleText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  } as TextStyle,
});

export default iconTextStyles;
