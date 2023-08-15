import { StyleSheet } from 'react-native';
import { fonts } from 'styles/theme';

const topFieldButtonStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldText: {
    marginHorizontal: 6,
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  },
  delimiter: {
    height: 3,
    width: '100%',
    marginTop: 5,
  },
});

export default topFieldButtonStyles;
