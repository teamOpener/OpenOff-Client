import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const alertCardStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
  },
  alertInfo: {
    marginLeft: 25,
    flexDirection: 'column',
  },
  alertTitle: {
    color: colors.white,
    fontSize: 15,
    fontFamily: fonts.medium,
  },
  alertDate: {
    color: colors.white,
    fontSize: 13,
    fontFamily: fonts.regular,
  },
});

export default alertCardStyles;
