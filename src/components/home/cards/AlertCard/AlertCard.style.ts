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
    gap: 3,
  },
  alertTitle: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: fonts.medium,
  },
  alertDate: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: fonts.regular,
  },
});

export default alertCardStyles;
