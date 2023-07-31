import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const titleTextStyles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
  } as TextStyle,
});

export default titleTextStyles;
