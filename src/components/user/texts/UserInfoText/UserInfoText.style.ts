import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const userInfoTextStyles = StyleSheet.create({
  container: {
    gap: 10,
  },
  contentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontFamily: fonts.semibold,
    color: colors.grey,
  },
});

export default userInfoTextStyles;
