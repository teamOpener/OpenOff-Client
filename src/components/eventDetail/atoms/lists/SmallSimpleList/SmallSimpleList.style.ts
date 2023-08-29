import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const smallSimpleListStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationWrapper: {
    alignSelf: 'flex-start',
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 12 * 1.4,
  } as TextStyle,
  desc: {
    flex: 1,
  },
});

export default smallSimpleListStyles;
