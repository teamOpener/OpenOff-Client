import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const ledgerHeaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontFamily: fonts.semibold,
    fontSize: 18,
  } as TextStyle,
  subTitleText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
});

export default ledgerHeaderStyles;
