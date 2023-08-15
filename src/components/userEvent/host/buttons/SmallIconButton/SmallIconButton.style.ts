import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const smallIconButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 6,
    marginTop: 8,
    marginRight: 25,
    alignItems: 'center',
  },
  labelText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 12 * 1.4,
  } as TextStyle,
});

export default smallIconButtonStyles;
