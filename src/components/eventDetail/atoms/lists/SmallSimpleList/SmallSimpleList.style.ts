import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const smallSimpleListStyles = StyleSheet.create({
  title: {
    fontFamily: fonts.semibold,
    fontSize: 12,
  } as TextStyle,
  desc: {
    flex: 1,
  },
});

export default smallSimpleListStyles;
