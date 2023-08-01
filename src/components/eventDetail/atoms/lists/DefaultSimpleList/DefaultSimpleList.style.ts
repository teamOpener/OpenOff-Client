import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const defaultSimpleListStyles = StyleSheet.create({
  desc: {
    flex: 1,
  },
  descText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  } as TextStyle,
});

export default defaultSimpleListStyles;
