import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const largeIconButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    gap: 10,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  iconWrapper: {
    flexDirection: 'row',
    padding: 6,
  },
  labelText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  } as TextStyle,
});

export default largeIconButtonStyles;
