import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const defaultSimpleListStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    flex: 1,
  },
  descText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
});

export default defaultSimpleListStyles;
